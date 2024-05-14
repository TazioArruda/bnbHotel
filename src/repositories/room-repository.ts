import { OutputRoomDTO } from "../dto/room-dto";
import { RomModel } from "../entities/room";


export class RoomRepository{
    async create(params:OutputRoomDTO){
       const room = await RomModel.create(params)
       return room
    }
}