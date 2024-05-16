import { Request, Response } from "express";
import * as yup from "yup"
import { RoomRepository } from "../repositories/room-repository";
import { RoomService } from "../services/room-service";
import { CodeStatus } from "../utilis/status";

const repository = new RoomRepository();
const service = new RoomService(repository)

export async function roomController(req:Request, res:Response) {

    try {
        const {body, file} = req 
        const bodyValidator = yup.object({
            number: yup.number().required().min(0),
            type: yup.string().required(),
            guest_capacity: yup.number().required().min(1),
            daily_rate: yup.number().required().min(0),
            photo: yup.string().required(), 
        })
        console.log("body: ", body)
        console.log("file: ", file)
        const data = {...body, photo: file?.filename}
        await bodyValidator.validate(data)
        const result = await service.create(data)
        return res.status(CodeStatus.CREATED).json(result)

    } catch (err) {

        if (err.message === "registered room"){
            return res.status(CodeStatus.CONFLICT).json({message: err.message})
        }

        return res.status(CodeStatus.BAD_REQUEST).json({message: err.message})
    }

}