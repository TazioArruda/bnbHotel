import { InputCustomRomDTO } from "../dto/custom-room-dto"
import { RomModel } from "../entities/room"


export class RoomRepository {
    async create(params: InputCustomRomDTO ){
        const room = await RomModel.create(params)
        return room
    }
}