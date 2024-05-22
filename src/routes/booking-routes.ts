import {Router} from "express";
import { bookingController } from "../controller/booking-controller";
import { authenticateGuest } from "../middleware/auth-guest-middleware";
import { cancelBookingController } from "../controller/cancel-booking-controller";




const bookingRoutes = Router();

bookingRoutes.post("/", authenticateGuest, bookingController);
bookingRoutes.delete("/:id", authenticateGuest, cancelBookingController);

export {bookingRoutes}
