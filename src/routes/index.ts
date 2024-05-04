import { Router } from "express";
import { guestRoutes } from "./guest-routes";


const routes = Router()

routes.use("/guest", guestRoutes)

export {routes}