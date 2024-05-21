import {Router} from "express";
import { bookingController } from "../controller/booking-controller";
import { authenticateGuest } from "../middleware/auth-guest-middleware";




const bookingRoutes = Router();

bookingRoutes.post("/", authenticateGuest, bookingController);

export {bookingRoutes}
