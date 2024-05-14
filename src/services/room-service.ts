import { Admin } from "mongodb";
import { InputRoomDTO, OutputRoomDTO } from "../dto/room-dto";
import { RoomRepository } from "../repositories/room-repository";



export class RoomService{

    constructor(private roomRepository: RoomRepository){}

    async create(params: InputRoomDTO): Promise<OutputRoomDTO>{
        // Verificação se o usúario é um administrador 
        if(!user.isAdmin){
            throw new Error("Unauthorized: Only administrators can create rooms.")
        }
        //Criação de um objeto quarto com status inicial "Disponivel"

        const newRoom = {
            ...params,
            status: "disponível",
        }
        const createdRoom = await this.roomRepository.create(newRoom);
        
        return createdRoom
    }

}