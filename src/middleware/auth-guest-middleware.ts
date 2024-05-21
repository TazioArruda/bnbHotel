import { Request, Response, NextFunction } from 'express';
import { CodeStatus } from '../utilis/status';

// Middleware de autenticação de usuário
export function authenticateGuest(req: Request, res: Response, next: NextFunction) {

  // Exemplo de verificação simples
  const token = req.headers.authorization;
  if (token) {
    // Verificar o token (exemplo)
    // Se o token for válido, chamar next()
    return next();
  }

  // Se não for autenticado, retornar erro 401
  return res.status(CodeStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
}