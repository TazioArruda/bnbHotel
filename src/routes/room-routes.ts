import { Router } from "express";
import { getAvailableRooms, roomController, updateStatus } from "../controller/room-controller";
import { authenticateAdmin } from "../middleware/authorization-middleware";
import { storageMiddleware } from "../middleware/storage-middleware";
import { authenticateGuest } from "../middleware/auth-guest-middleware";
import { getAvailableRoomsController } from "../controller/booking-controller";

const roomRoutes = Router();

roomRoutes.post(
  "/",
  authenticateAdmin,
  storageMiddleware.single("photo"),
  roomController
);
roomRoutes.put("/:id", authenticateAdmin, updateStatus);
roomRoutes.get('/available', getAvailableRooms)
roomRoutes.get("/availableRooms", getAvailableRoomsController);


export { roomRoutes };
