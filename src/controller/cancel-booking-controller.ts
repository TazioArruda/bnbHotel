import { Request, Response } from "express";
import { BookingService } from "../services/booking-service";
import { CodeStatus } from "../utilis/status";
import { RoomRepository } from "../repositories/room-repository";
import { BookingRepository } from "../repositories/booking-repository";

// Instanciando os repositórios e serviços necessários
const roomRepository = new RoomRepository();
const bookingRepository = new BookingRepository();
const bookingService = new BookingService(bookingRepository, roomRepository);

export async function cancelBookingController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const guestId = req.user?.id;

    if (!guestId) {
      return res.status(CodeStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }

    await bookingService.cancelBooking(id, guestId);

    return res.sendStatus(CodeStatus.OK);
  } catch (err) {
    return res.status(CodeStatus.BAD_REQUEST).json({ message: err.message });
  }
}
