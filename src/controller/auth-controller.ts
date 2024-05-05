import { Request, Response } from "express";
import * as yup from "yup"

async function loginController(req:Request, res: Response) {
    try {

        const { body } = req

        const bodyValidator = yup.object({
            email: yup.string().email().required(),
            password: yup.string().min(6).max(8).required()
        })
        
    } catch (error) {
        
    }
    
}