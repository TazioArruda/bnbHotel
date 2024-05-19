import { Admin } from "mongodb";
import { InputRoomDTO, OutputRoomDTO } from "../dto/room-dto";
import { RoomRepository } from "../repositories/room-repository";
import { UpdateStatusDTO } from "../dto/status-update-dto";
import { StringDecoder } from "string_decoder";

export class RoomService {
  constructor(private roomRepository: RoomRepository) {}
  async create(params: InputRoomDTO) {
    //Criação de um objeto quarto com status inicial "Disponivel"
    const newRoom = {
      ...params,
      status: "disponível",
    };
    const createdRoom = await this.roomRepository.create(newRoom);
    return createdRoom;
  }
  async update(id: string, updateStatus: string) {
    // Validar o novo status
    if (!["disponível", "ocupado", "manutenção"].includes(updateStatus)) {
      throw new Error("Invalid status.");
    }
    // Encontrar o quarto pelo ID
    console.log(`service ${id}`);
    const room = await this.roomRepository.updateById(id, updateStatus);
    if (!room) {
      throw new Error("Room not found.");
    }

    return room;
  }
  // Encontrar os disponiveis

  async listAvailableRooms() {
    //console.log("Calling listAvailableRooms function...");
    const availableRooms = await this.roomRepository.findAllAvailable();
    //console.log("Available Rooms:", availableRooms);
    return availableRooms;
  }
}
