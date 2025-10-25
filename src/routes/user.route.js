import { Router } from "express";
import UserController from "../controllers/user.controller.js";
// import middlewares from "../middlewares/index.js";

const controller = new UserController();
const router = Router();
// define the about route
router.get("/", controller.getAllUsers);
// router.get("/:id", controller.getUserById);
router.post("/", controller.createUser);
// router.delete("/:id", controller.deleteUser);
// router.put("/:id", controller.editUser);

export default router;