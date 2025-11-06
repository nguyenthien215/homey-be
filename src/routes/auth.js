import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { jwt } from "../middlewares/auth.js";

const controller = new AuthController();
const router = Router();

router.post("/signin", controller.signin.bind(controller));
router.post("/signout", controller.signout.bind(controller));
router.post("/signup", controller.signup.bind(controller));
router.get("/me", jwt(), controller.getProfile.bind(controller));

export default router;
