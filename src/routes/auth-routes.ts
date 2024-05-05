import {Router} from "express"
import { loginController } from "../controller/auth-controller"


const authRoutes = Router()

authRoutes.post("/", loginController )

export {authRoutes}