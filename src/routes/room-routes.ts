import { Router } from "express";
import { roomController, updateStatus } from "../controller/room-controller";
import { authenticateAdmin } from "../middleware/authorization-middleware";
import { storageMiddleware } from "../middleware/storage-middleware";

const roomRoutes = Router();

roomRoutes.post(
  "/",
  authenticateAdmin,
  storageMiddleware.single("photo"),
  roomController
);
roomRoutes.put("/:id", authenticateAdmin, updateStatus);

export { roomRoutes };
