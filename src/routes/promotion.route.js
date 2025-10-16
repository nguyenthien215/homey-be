import { Router } from "express";
import PromotionController from "../controllers/promotion.controller.js";
// import middlewares from "../middlewares/index.js";

const controller = new PromotionController();
const router = Router();
// define the about route
router.get("/", controller.getAllPromotions);
// router.post("/", controller.createUser);
// router.delete("/:id", controller.deleteUser);
// router.get("/:id", controller.getUserById);
// router.put("/:id", controller.editUser);

export default router;

