import { Router } from "express";
import RoleController from "../controllers/role.controller.js";

const router = Router();
const controller = new RoleController();

router.get("/", controller.getAllRoles.bind(controller));

export default router;
