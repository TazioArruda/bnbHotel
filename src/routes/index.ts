import { Router } from "express";
import { guestRoutes } from "./guest-routes";
import { authRoutes } from "./auth-routes";
import { adminLogin } from "../controller/admin-auth-controller";


const routes = Router()

routes.use("/admin", adminLogin)
routes.use("/guest", guestRoutes)
routes.use("/auth", authRoutes)

export {routes}