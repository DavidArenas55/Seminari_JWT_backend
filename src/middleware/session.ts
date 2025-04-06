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

// Middleware de autenticación
const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwtByUser = req.headers.authorization || null;
        const jwt = jwtByUser?.split(' ').pop(); // Extrae el JWT del header
        console.log(jwt);

        const isUser = verifyToken(`${jwt}`);
        
        if (!isUser) {
            return res.status(401).send("NO_TIENES_UN_JWT_VALIDO");
        }

        req.user = isUser; // Asignamos `user` a `req` directamente
        next(); // Si el token es válido, pasa al siguiente middleware
    } catch (e) {
        console.error("Error en checkJwt:", e);
        return res.status(401).send("SESSION_NO_VALID");
    }
};


export { checkJwt};
