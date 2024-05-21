import { BookingInputDTO, BookingOutputDTO } from "../dto/booking-dto";
import { BookingRepository } from "../repositories/booking-repository";
import { RoomRepository } from "../repositories/room-repository";

export class BookingService {
  constructor(
    private bookingRepository: BookingRepository,
    private roomRepository: RoomRepository
  ) {}

  async create(params: BookingInputDTO){
    // Verificar se o quarto existe
    const room = await this.roomRepository.getById(params.id_room);
    if (!room) {
      throw new Error("Room not found.");
    }

    // Verificar se a quantidade de hóspedes não excede a capacidade do quarto
    if (params.guests > room.guest_capacity) {
      throw new Error("Number of guests exceeds room capacity.");
    }

    // Verificar se já não existe uma reserva no intervalo solicitado
    const overlappingBookings =
      await this.bookingRepository.findOverlappingBookings(
        params.id_room,
        params.checkin_date,
        params.checkout_date
      );
    if (overlappingBookings.length > 0) {
      throw new Error("Room is not available in the selected date range.");
    }

    // Criar a reserva com status "confirmada"
    const booking = await this.bookingRepository.create({
      ...params,
      status: "confirmada",
    });

    return booking;
  }
}
