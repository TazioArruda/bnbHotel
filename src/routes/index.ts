import { Router } from "express";
import { guestRoutes } from "./guest-routes";
import { authRoutes } from "./auth-routes";
import { adminLogin } from "../controller/admin-auth-controller";
import { roomRoutes } from "./room-routes";

const routes = Router();

routes.use("/admin", adminLogin);
routes.use("/room", roomRoutes);
routes.use("/guest", guestRoutes);
routes.use("/auth", authRoutes);

export { routes };
