import { InputRoomDTO, OutputRoomDTO } from "../dto/room-dto";
import { RomModel } from "../entities/room";


export class RoomRepository{
    async create(params:InputRoomDTO){
       const room = await RomModel.create(params)
       return room
    }
}