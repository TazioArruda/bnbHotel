import { Request, Response } from "express";
import * as yup from "yup";

import { GuestRepository } from "../repositories/guest-repository";
import { AuthService } from "../services/auth-service";
import { CodeStatus } from "../utilis/status";

// Instancia os repositórios e serviços necessários
const repository = new GuestRepository();
const service = new AuthService(repository);

// Função controladora para o login
export async function loginController(req: Request, res: Response) {
  try {
    const { body } = req;

    const bodyValidator = yup.object({
      email: yup.string().email().required(),
      password: yup.string().min(6).max(8).required(),
    });
    // Valida o corpo da requisição
    await bodyValidator.validate(body);
    const result = await service.login(body);
    return res.status(CodeStatus.OK).json(result);
  } catch (err) {
    return res.status(CodeStatus.BAD_REQUEST).json({ message: err.message });
  }
}
