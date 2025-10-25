import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { jwt } from "../middlewares/index.js";

const controller = new AuthController();
const router = Router();


router.post("/signin", controller.signin.bind(controller));
router.post("/signout", controller.signout.bind(controller));
router.post("/signup", controller.signup.bind(controller));
// router.post("/refresh", controller.refresh?.bind(controller)); // nếu có refresh
router.get("/me", jwt(), controller.getProfile.bind(controller));

export default router;
