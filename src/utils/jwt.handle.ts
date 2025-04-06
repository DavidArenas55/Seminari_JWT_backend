import pkg from "jsonwebtoken";
const { sign, verify } = pkg;   // Importamos las funciones sign y verify de la librería jsonwebtoken
const JWT_SECRET = process.env.JWT_SECRET || "token.010101010101";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "refresh_token_secret"; // Secreto para el refresh token

// Definimos los datos que incluiremos en el token
export interface JwtPayload {
    id: string;
    email: string;
    name?: string;
    googleId?: string;  // Añadido para Google Auth
}

// Genera el JWT y el refresh token
const generateTokens = (userData: JwtPayload) => {
    const jwt = sign(userData, JWT_SECRET, { expiresIn: '20s' }); // JWT de corta duración
    const refreshToken = sign(userData, REFRESH_TOKEN_SECRET, { expiresIn: '30d' }); // Refresh token de larga duración
    return { jwt, refreshToken };
};
// No debemos pasar información sensible en el payload, en este caso vamos a pasar como parámetro el ID del usuario, email, nombre y Google ID si existe

// Función para verificar el token y devolver el payload
const verifyToken = (jwt: string): JwtPayload => {
    const isOk = verify(jwt, JWT_SECRET) as JwtPayload;
    return isOk;
};

// Verifica el refresh token
const verifyRefreshToken = (refreshToken: string): JwtPayload => {
    const isOk = verify(refreshToken, REFRESH_TOKEN_SECRET) as JwtPayload;
    return isOk;
};

export { generateTokens, verifyToken, verifyRefreshToken };
