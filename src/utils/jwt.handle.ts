import pkg from "jsonwebtoken";
const { sign, verify } = pkg;   // Importamos las funciones sign y verify de la librería jsonwebtoken
const JWT_SECRET = process.env.JWT_SECRET || "token.010101010101";

// Definimos los datos que incluiremos en el token
export interface JwtPayload {
    id: string;
    email: string;
    name?: string;
    googleId?: string;  // Añadido para Google Auth
}

// No debemos pasar información sensible en el payload, en este caso vamos a pasar como parámetro el ID del usuario, email, nombre y Google ID si existe
const generateToken = (userData: JwtPayload) => {
    const jwt = sign(userData, JWT_SECRET, { expiresIn: '20s' }); // Puedes ajustar la duración
    return jwt;
};

// Función para verificar el token y devolver el payload
const verifyToken = (jwt: string): JwtPayload => {
    const isOk = verify(jwt, JWT_SECRET) as JwtPayload;
    return isOk;
};

export { generateToken, verifyToken };
