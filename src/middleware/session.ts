import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.handle.js";
import { JwtPayload } from "jsonwebtoken";

// Define la interfaz aquí, directamente en el archivo session.ts
export interface JwtPayloadExt {
    id: string;
    email: string;
    name?: string;
    googleId?: string;
}

// Extiende el Request para incluir la propiedad 'user'
interface RequestExt extends Request {
    user?: JwtPayloadExt;  // Asegúrate de que 'user' sea del tipo JwtPayloadExt
}

// Middleware de autenticación
const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
    try {
        // Obtén el token del header de la solicitud
        const jwtByUser = req.headers.authorization || null;
        const jwt = jwtByUser?.split(' ').pop(); // Extrae el JWT del header
        console.log(jwt);

        // Verifica si el token es válido
        const isUser = verifyToken(`${jwt}`);
        
        if (!isUser) {
            return res.status(401).send("NO_TIENES_UN_JWT_VALIDO");
        }

        // Asigna la información del token al objeto 'req.user'
        req.user = isUser; // 'isUser' debería ser el payload del token
        next(); // Si el token es válido, pasa al siguiente middleware
    } catch (e) {
        console.error("Error en checkJwt:", e);
        return res.status(401).send("SESSION_NO_VALID");
    }
};

export { checkJwt };
