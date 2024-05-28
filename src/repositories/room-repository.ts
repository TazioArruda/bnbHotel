import { InputRoomDTO, OutputRoomDTO } from "../dto/room-dto";
import { BookingModel } from "../entities/booking";
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
   return RoomModel.find({ status: "disponivel" }).exec();
 }

 // ------------------crianção do metodo, para Listar Todos os Quartos disponíveis por data ---------------------------

 async getAvailableRoomsByDate(reservedRoomIds:string[]) {

  // Encontrar quartos disponíveis que não estejam nos IDs reservados
  return RoomModel.find({
    status: "disponivel",
    _id: { $nin: reservedRoomIds }
  }).exec();
}
}

