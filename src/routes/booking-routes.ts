import {Router} from "express";
import { bookingController, cancelBookingController } from "../controller/booking-controller";
import { authenticateGuest } from "../middleware/auth-guest-middleware";





const bookingRoutes = Router();

bookingRoutes.post("/", authenticateGuest, bookingController);
bookingRoutes.delete("/:id", authenticateGuest, cancelBookingController);

export {bookingRoutes}
