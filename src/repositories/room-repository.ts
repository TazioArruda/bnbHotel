import { InputRoomDTO, OutputRoomDTO } from "../dto/room-dto";
import { RomModel } from "../entities/room";

export class RoomRepository {
  async create(params: InputRoomDTO) {
    const room = await RomModel.create(params);
    return room;
  }

  async getById(id: string) {
    return RomModel.findById(id);
  }

  async updateById(id: string, status: string) {
    console.log(`repositori ${id}`);
    return RomModel.findOneAndUpdate(
      { _id: id },
      { status },
      { new: true }
    ).exec();
  }

  // async pushBooking(...booking){
  //     await RomModel.find
  // }
}
