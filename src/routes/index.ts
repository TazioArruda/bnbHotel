import { Router } from "express";
import { guestRoutes } from "./guest-routes";
import { authRoutes } from "./auth-routes";


const routes = Router()

routes.use("/guest", guestRoutes)
routes.use("/auth", authRoutes)

export {routes}