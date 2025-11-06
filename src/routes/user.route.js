import { Router } from "express";
import UserController from "../controllers/user.controller.js";
// import middlewares from "../middlewares/index.js";

const controller = new UserController();
const router = Router();
// define the about route
router.get("/", controller.getAllUsers.bind(controller));
router.get("/:id", controller.getUserById.bind(controller));
router.post("/", controller.createUser.bind(controller));
router.delete("/:id", controller.deleteUser.bind(controller));
router.put("/:id", controller.updateUser.bind(controller));

export default router;