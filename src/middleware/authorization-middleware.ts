
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Middleware de autenticação
export function authenticateAdmin(req: Request, res: Response, next: NextFunction) {
    // Obter o token JWT do cabeçalho da solicitação
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    try {
        // Decodificar o token JWT para obter as informações do usuário
        const decodedToken: any = jwt.verify(token, process.env.SECRET_KEY as string);

        // Verificar se o usuário é um administrador
        if (!decodedToken.isAdmin) {
            return res.status(403).json({ error: 'Access denied. You are not an administrator.' });
        }

        // Se o usuário for um administrador, permitir acesso à próxima função de middleware ou rota
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}