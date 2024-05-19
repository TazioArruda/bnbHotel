import { Router } from "express";
import { createGuestController } from "../controller/guest-controller";

const guestRoutes = Router();

guestRoutes.post("/", createGuestController);

export { guestRoutes };
