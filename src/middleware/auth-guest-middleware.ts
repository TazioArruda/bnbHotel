import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { CodeStatus } from '../utilis/status';

// Middleware de autenticação de usuário
export function authenticateGuest(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    // Se não houver cabeçalho de autorização, retornar erro 401
    return res.status(CodeStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1]; // Extrai o token após "Bearer "

  if (!token) {
    // Se o token não estiver presente, retornar erro 401
    return res.status(CodeStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }

  try {
    // Verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as { id: string };
    // Armazena o ID do hóspede no objeto req
    req.user = { id: decoded.id} ; // Certifique-se de que a interface Request seja estendida para incluir 'user'
    return next();
  } catch (err) {
    // Se o token não for válido, retornar erro 401
    return res.status(CodeStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }
}