import { Request, Response } from "express";

import * as yup from "yup";
import { AdminAuthService } from "../services/admin-service";
import { CodeStatus } from "../utilis/status";
import { AdminRepository } from "../repositories/admin-repository";

const repository = new AdminRepository();
const service = new AdminAuthService(repository);

export async function adminLogin(req: Request, res: Response) {
  try {
    // Validação do corpo da requisição utilizando o yup
    const { body } = req;
    const bodyValidator = yup.object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    await bodyValidator.validate(body);
    const result = await service.login(body);
    return res.status(CodeStatus.OK).json(result);
  } catch (err) {
    // Trata erros de validação ou erros do serviço de autenticação
    return res.status(CodeStatus.BAD_REQUEST).json({ message: err.message });
  }
}
