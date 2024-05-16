import { Admin } from "mongodb";
import { InputRoomDTO, OutputRoomDTO } from "../dto/room-dto";
import { RoomRepository } from "../repositories/room-repository";



export class RoomService{

    constructor(private roomRepository: RoomRepository){}

    async create(params: InputRoomDTO){
       
        //Criação de um objeto quarto com status inicial "Disponivel"

        const newRoom = {
            ...params,
            status: "disponível",
        }
        const createdRoom = await this.roomRepository.create(newRoom);
        
        return createdRoom
    }

}