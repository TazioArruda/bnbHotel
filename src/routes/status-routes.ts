import { Router } from "express";
import { authenticateAdmin } from "../middleware/authorization-middleware";
import { updateStatus } from "../controller/room-controller";



//const roomRoutes = Router()

//roomRoutes.post("/", authenticateAdmin, updateStatus  )

//export {roomRoutes}