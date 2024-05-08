import { Request, Response } from "express";
import * as yup from "yup"
import { GuestService } from "../services/guest-service";
import { GuestRepository } from "../repositories/guest-repository";
import { AuthService } from "../services/auth-service";
import { CodeStatus } from "../utilis/status";

const repository = new GuestRepository()
const service = new AuthService(repository)


export async function loginController(req:Request, res: Response) {
    try {

        const { body } = req

        const bodyValidator = yup.object({
            email: yup.string().email().required(),
            password: yup.string().min(6).max(8).required()
        })

        await bodyValidator.validate(body)
        const result = await service.login(body);
        return res.status(CodeStatus.OK).json(result)
        
    } catch (err) {

        return res.status(CodeStatus.BAD_REQUEST).json({ message: err.message})
        
    }
    
}