import { BookingModel } from "../entities/booking";

export class BookingRepository {
  async create(params: { status: string }) {
    const booking = await BookingModel.create(params);
    return booking;
  }
}
