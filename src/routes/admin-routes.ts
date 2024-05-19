import { Router } from "express";
import { adminLogin } from "../controller/admin-auth-controller";

const adminRoutes = Router();

adminRoutes.post("/", adminLogin);

export { adminRoutes };
