import { InputRoomDTO, OutputRoomDTO } from "../dto/room-dto";
import { RoomModel } from "../entities/room";


export class RoomRepository {
  async create(params: InputRoomDTO) {
    const room = await RoomModel.create(params);
    return room;
  }

  async getById(id: string) {
    return RoomModel.findById(id);
  }

  async updateById(id: string, status: string) {
    console.log(`repositori ${id}`);
    return RoomModel.findOneAndUpdate(
      { _id: id },
      { status },
      { new: true }
    ).exec();
  }

  async findAllAvailable() {
   return RoomModel.find({ status: "disponível" }).exec();
 }

  // async pushBooking(...booking){
  //     await RomModel.find
  // }
}
