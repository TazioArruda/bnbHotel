import { Request, Response } from "express";
import * as yup from "yup";
import { RoomRepository } from "../repositories/room-repository";
import { RoomService } from "../services/room-service";
import { CodeStatus } from "../utilis/status";

const repository = new RoomRepository();
const service = new RoomService(repository);

export async function roomController(req: Request, res: Response) {
  try {
    const { body, file } = req;
    const bodyValidator = yup.object({
      number: yup.number().required().min(0),
      type: yup.string().required(),
      guest_capacity: yup.number().required().min(1),
      daily_rate: yup.number().required().min(0),
      photo: yup.string().required(),
    });
    const data = { ...body, photo: file?.filename };
    await bodyValidator.validate(data);
    const result = await service.create(data);
    return res.status(CodeStatus.CREATED).json(result);
  } catch (err) {
    if (err.message === "registered room") {
      return res.status(CodeStatus.CONFLICT).json({ message: err.message });
    }

    return res.status(CodeStatus.BAD_REQUEST).json({ message: err.message });
  }
}

export async function getAvailableRooms(req: Request, res: Response) {
    try {
      const availableRooms = await service.listAvailableRooms();
      res.status(CodeStatus.OK).json(availableRooms);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


export async function updateStatus(req: Request, res: Response) {
  try {
    // Extrair o corpo da requisição
    console.log(req.params);
    console.log(req.body);
    const { id } = req.params;
    const body = req.body;
    const bodyValidator = yup.object({
      status: yup.string().required(),
    });

    const paramsValidator = yup.object({
      id: yup.string().required(),
    });

    await bodyValidator.validate(body);
    await paramsValidator.validate({ id });
    const result = await service.update(id, body.status);
    return res.status(CodeStatus.CREATED).json(result);
  } catch (err) {
    // Tratar erros de validação ou outros erros
    if (err.message === "registered status") {
      return res.status(CodeStatus.CONFLICT).json({ message: err.message });
    }

    return res.status(CodeStatus.BAD_REQUEST).json({ message: err.message });
  }
}


