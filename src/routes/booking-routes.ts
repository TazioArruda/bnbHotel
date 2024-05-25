import {Router} from "express";
import { bookingController, cancelBookingController, listBookingsForGuestController } from "../controller/booking-controller";
import { authenticateGuest } from "../middleware/auth-guest-middleware";





const bookingRoutes = Router();

bookingRoutes.post("/", authenticateGuest, bookingController);
bookingRoutes.delete("/:id", authenticateGuest, cancelBookingController);
bookingRoutes.get("/listBooking", authenticateGuest, listBookingsForGuestController);

export {bookingRoutes}
