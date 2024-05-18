import { Admin } from "mongodb";
import { InputRoomDTO, OutputRoomDTO } from "../dto/room-dto";
import { RoomRepository } from "../repositories/room-repository";
import { UpdateStatusDTO } from "../dto/status-update-dto";



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

    async update(id: string, updateStatusDTO: UpdateStatusDTO){
        const { status } = updateStatusDTO;
    
        // Validar o novo status
        if (!['disponível', 'ocupado', 'manutenção'].includes(status)) {
          throw new Error('Invalid status.');
        }
    
        // Encontrar o quarto pelo ID
        const room = await this.roomRepository.getById(id);
        if (!room) {
          throw new Error('Room not found.');
        }
    
        // Atualizar o status do quarto
        room.status = status;
    
        // Salvar as alterações no banco de dados
        const updatedRoom = await this.roomRepository.updateById(id, status );
    
        return updatedRoom;
      }

}