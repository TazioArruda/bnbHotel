import { Router } from "express";
import { roomController } from "../controller/room-controller";
import { authenticateAdmin } from "../middleware/authorization-middleware";



const roomRoutes = Router()

roomRoutes.post("/", authenticateAdmin, roomController )

export {roomRoutes}