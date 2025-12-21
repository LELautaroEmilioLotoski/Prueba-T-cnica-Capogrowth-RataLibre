import { Request, Response, NextFunction } from "express";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']; // Busca el encabezado 'Authorization'
    
    // authHeader podría ser 'Bearer TOKEN' o undefined
    const token = authHeader && authHeader.split(' ')[1]; // Toma solo el token (el segundo elemento del split)

    if (token == null) {
        return res.sendStatus(401); // Si no hay token, no autorizado
    }

    (req as any).mlToken = token
    
    next();
}