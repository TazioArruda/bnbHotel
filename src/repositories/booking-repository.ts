import { BookingModel } from "../entities/booking";

export class BookingRepository {
  async create(params: { status: string }) {
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
}


