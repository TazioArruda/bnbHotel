import { BookingModel } from "../entities/booking";

export class BookingRepository {
  async create(params: {
    checkin_date: Date;
    checkout_date: Date;
    guests: number;
    id_room: string;
    id_guest: string;
    status: string;
  }) {
    const booking = await BookingModel.create(params);
    return booking;
  }

  async findOverlappingBookings(
    id_room: string,
    checkin_date: Date,
    checkout_date: Date
  ){
    return BookingModel.find({
      id_room,
      $or: [
        { checkin_date: { $lt: checkout_date, $gte: checkin_date } },
        { checkout_date: { $gt: checkin_date, $lte: checkout_date } },
        { checkin_date: { $lte: checkin_date }, checkout_date: { $gte: checkout_date } },
      ],
    }).exec();
  }

  async delete(id: string){
    await BookingModel.findByIdAndDelete(id);
  }
  async getById(id: string){
    return BookingModel.findById(id);
  }

  async getAllBookingsForGuest(guestId: string) {
    return BookingModel.find({ id_guest: guestId }).exec();
  }

  async getReserve (startDate: Date, endDate: Date){
    const reservedRoomIds = await BookingModel.find({
      $or: [
        { checkin_date: { $lt: endDate, $gte: startDate } },
        { checkout_date: { $gt: startDate, $lte: endDate } },
        { checkin_date: { $lte: startDate }, checkout_date: { $gte: endDate } }
      ],
      status: { $in: ["confirmada", "em andamento"] }
    }).distinct("id_room");
    
    return reservedRoomIds
  }

}



