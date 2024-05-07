import { Request, Response } from "express";

import * as yup from "yup";
import { CustomRoomService } from "../services/room-service";
import { CodeStatus } from "../utilis/status";

const repository = new GuestRepository()
const service = new GuestService(repository)

export async function CustomRoomController(req: Request, res: Response) {

        try {
            // Defina o schema de validação com Yup
            const {body} = req
            const bodyValidator = yup.object().shape({
                id: yup.string().required(),
                number: yup.number().required(),
                type: yup.string().required(),
                guest_capacity: yup.number().required(),
                daily_rate: yup.number().required(),
                photoUrl: yup.string().required(),
                status: yup.string().required()
            });

            // Valide os dados de entrada do corpo da requisição
            await bodyValidator.validate(body)
            const result = await service.create(body)
            return res.status(CodeStatus.CREATED).json(result)

            // Se a validação passar, crie o quarto personalizado
            const input: InputCustomRoomDTO = req.body;
            const customRoom = await this.customRoomService.create(input);

            res.status(201).json(customRoom);
        } catch (error) {
            // Se houver erros de validação, retorne-os ao cliente
            if (error instanceof yup.ValidationError) {
                res.status(400).json({ message: "Erro de validação", errors: error.errors });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }