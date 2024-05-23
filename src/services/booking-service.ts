import { BookingInputDTO, BookingOutputDTO } from "../dto/booking-dto";
import { BookingRepository } from "../repositories/booking-repository";
import { RoomRepository } from "../repositories/room-repository";


export class BookingService {
  constructor(
    private bookingRepository: BookingRepository,
    private roomRepository: RoomRepository
  ) {}

  async create(data: BookingInputDTO, guestId: string){

    const { id_room, guests, checkin_date, checkout_date, id_guest } = data;

    // Verificar se o quarto existe
    const room = await this.roomRepository.getById(id_room);
    if (!room) {
      throw new Error("Room not found.");
    }
        console.log("id Logado", guestId)
        console.log("id data", id_guest)
    // Verificar se o hóspede que está tentando cadastar é o proprietário da reserva
    if(guestId !== id_guest){
      throw new Error("you are registering a reservation with a user that is not yours.");
    }

    // Verificar se a quantidade de hóspedes não excede a capacidade do quarto
    if (guests > room.guest_capacity) {
      throw new Error("Number of guests exceeds room capacity.");
    }

    // Verificar se já não existe uma reserva no intervalo solicitado
    const overlappingBookings =
      await this.bookingRepository.findOverlappingBookings(
        id_room,
        checkin_date,
        checkout_date
      );
    if (overlappingBookings.length > 0) {
      throw new Error("Room is not available in the selected date range.");
    }

    // Criar a reserva com status "confirmada" e o ID do hóspede autenticado
    const booking = await this.bookingRepository.create({
      checkin_date,
      checkout_date,
      guests,
      id_room,
      id_guest: guestId,
      status: "confirmada"
    });

    return booking;

    
  }

  async cancelBooking(bookingId: string, guestId: string){
    // Buscar a reserva pelo ID
    const booking = await this.bookingRepository.getById(bookingId);

    // Verificar se a reserva existe
    if (!booking) {
      throw new Error("Booking not found.");
    }
    // Verificar se o hóspede que está tentando cancelar é o proprietário da reserva
    if(booking.id_guest !== guestId){
      throw new Error("You can only cancel your own bookings.");
    }

    // Verificar se o status da reserva é "em andamento"
    if (booking.status === "em andamento") {
      throw new Error("Cannot cancel booking in progress.");
    }

    // Cancelar a reserva
    await this.bookingRepository.delete(bookingId);
  }

}
