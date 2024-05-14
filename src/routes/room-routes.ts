import { Router } from "express";
import { roomController } from "../controller/room-controller";



const roomRoutes = Router()

roomRoutes.post("/", roomController )

export {roomRoutes}