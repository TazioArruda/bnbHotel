import { Request, Response } from "express";
import * as yup from "yup"
import { GuestRepository } from "../repositories/guest-repository";
import { GuestService } from "../services/guest-service";

const repository = new GuestRepository()
const service = new GuestService(repository)

 export async function createGuestController(req: Request, res: Response){
    try {
        const {body} = req
        const bodyValidator = yup.object({
            email: yup.string().email().required(),
            name: yup.string().required(),
            cpf: yup.string().required().min(11).max(11),
            phone_number: yup.string().required(),
            password: yup.string().min(6).max(6).required(),
           

        })
    
    
        
        await bodyValidator.validate(body)
        const result = await service.create(body)
        return res.status(201).json(result)
        
    } catch (err: any) {

        if (err.message === "registered user"){
            return res.status(409).json({message: err.message})
        }

        return res.status(400).json({message: err.message})
        
    }

      
}