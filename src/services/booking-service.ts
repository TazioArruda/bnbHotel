import { BookingInputDTO, BookingOutputDTO } from "../dto/booking-dto";
import { BookingRepository } from "../repositories/booking-repository";
import { RoomRepository } from "../repositories/room-repository";

//----------------------METODO DE CRIAÇÃO DE RESERVA ----------------------------------------
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
    // Verificando se o status é diferente de disponivel
    if(room.status !== "disponivel"){

      throw new Error("Room is not available")
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

    // ------------------METODO DE CANCELAR RESERVA ----------------------------------

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


  //---------------- METODO DE BUSCAR RESERVAS FEITAS PELO HOSPEDE LOGADO --------------------------
  async getAllBookingsForGuest(guestId: string) {
    return this.bookingRepository.getAllBookingsForGuest(guestId);
  }

  //---------------- METODO  DE LISTAR TODOS OS QUARTOS DISPONÍVEIS POR DATA -----------------------
  async getAvailableRoomsByDate(checkin_date: Date, checkout_date: Date) {
    const ids = await this.bookingRepository.getReserve(checkin_date, checkout_date);
    console.log("ids reservado", ids)
    return this.roomRepository.getAvailableRoomsByDate(ids);
    
    
  }
}

