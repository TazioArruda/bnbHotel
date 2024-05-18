import { InputRoomDTO, OutputRoomDTO } from "../dto/room-dto";
import { RomModel } from "../entities/room";


export class RoomRepository{
    async create(params:InputRoomDTO){
       const room = await RomModel.create(params)
       return room
    }

    async getById(id: string){
        return RomModel.findById(id);
      }
    
      async updateById(id: string, status: string){
        return RomModel.findByIdAndUpdate({id, status})
      }

   // async pushBooking(...booking){
   //     await RomModel.find
   // }
}