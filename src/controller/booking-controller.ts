import { Request, Response, Router } from 'express';
import * as yup from 'yup';
import { RoomRepository } from '../repositories/room-repository';
import { BookingRepository } from '../repositories/booking-repository';
import { BookingService } from '../services/booking-service';
import { CodeStatus } from '../utilis/status';





const roomRepository = new RoomRepository(); // Repositório de quartos
const bookingRepository = new BookingRepository(); // Repositório de reservas
const bookingService = new BookingService(bookingRepository, roomRepository);

// ------------------- Função controladora para criar uma reserva ---------------------------------------
export async function bookingController(req: Request, res: Response) {
  try {
    
    const { body } = req;
    const guestId = req.user?.id;

    if (!guestId) {
      return res.status(CodeStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }

    const bodyValidator = yup.object({
      checkin_date: yup.date().required(), 
      checkout_date: yup.date().required(), 
      guests: yup.number().required().positive().integer(), 
      id_room: yup.string().required(),
      id_guest: yup.string().required(),
      status: yup.string().oneOf(['confirmada', 'pendente']).default('confirmada')
    });

    // Validando os dados do corpo da requisição
    await bodyValidator.validate(body);

    // Chamar o serviço de reservas passando o ID do hóspede autenticado
    const result = await bookingService.create({...body}, guestId);
    return res.status(CodeStatus.CREATED).json(result);

  } catch (err: any) {
    // Tratando erros de validação
    if (err.message === "registered booking") {
      return res.status(CodeStatus.BAD_REQUEST).json({

      });
    }
    return res.status(CodeStatus.BAD_REQUEST).json({ message: err.message });
  }
}

  // -----------------------Função controladora para cancelar uma reserva -----------------------------------------
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

// --------------------------Função Controladora para Listas todas as reservas----------------------------------- 

export async function listBookingsForGuestController(req: Request, res: Response) {
  try {
    const guestId = req.user?.id;

    if (!guestId) {
      return res.status(CodeStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }

    const bookings = await bookingService.getAllBookingsForGuest(guestId);
    return res.status(CodeStatus.OK).json(bookings);

  } catch (err: any) {
    return res.status(CodeStatus.BAD_REQUEST).json({ message: err.message });
  }
}

// ------------------------Função controladora para listar quartos disponíveis por data -----------------------------
export async function getAvailableRoomsController(req: Request, res: Response) {
  try {
    const {body} = req;
    const bodyValidator = yup.object({
      checkin_date: yup.date().required(),
      checkout_date: yup.date().required()
    });
    
    await bodyValidator.validate(body);
   

    const result = await bookingService.getAvailableRoomsByDate(body.checkin_date, body.checkout_date);
    

    return res.status(CodeStatus.OK).json(result);
  } catch (err: any) {
    return res.status(CodeStatus.BAD_REQUEST).json({ message: err.message });
  }
}