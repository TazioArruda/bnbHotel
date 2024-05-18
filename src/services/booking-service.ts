import { BookingInputDTO } from "../dto/booking-dto";
import { BookingRepository } from "../repositories/booking-repository";
import { RoomRepository } from "../repositories/room-repository";


export class bookingService {
    constructor(
       private bookingRepository:BookingRepository,
       private RoomRepository: RoomRepository
    ){}

    async create(params: BookingInputDTO){

        const booking = await this.bookingRepository.create({

            status: params.status

        })

       // await this.RoomRepository.pushBooking(...booking)

    }
}