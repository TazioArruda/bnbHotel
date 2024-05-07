
import { InputCustomRomDTO } from "../dto/custom-room-dto";
import { GuestRepository } from "../repositories/guest-repository";
import { RoomRepository } from "../repositories/room-repository";

export class CustomRoomService {
    constructor(
        private customRoomRepository: RoomRepository,
        private guestRepository: GuestRepository
    ) {}

    async create(input: InputCustomRomDTO): Promise<InputCustomRomDTO> {
        try {
            // Crie uma instância do quarto personalizado
            const customRoom = await this.customRoomRepository.create(input);

            // Verifique se há um hóspede associado e, em seguida, adicione-o ao quarto
            if (input.id) {
                const guest = await this.guestRepository.findById(input.Id);
                if (guest) {
                    // Adicione o hóspede ao quarto personalizado
                    customRoom.guest = guest;
                    await this.customRoomRepository.save(customRoom);
                } else {
                    throw new Error("Guest not found.");
                }
            }

            return customRoom;
        } catch (error) {
            throw new Error(`Error creating custom room: ${error.message}`);
        }
    }
}