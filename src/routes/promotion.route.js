import { Router } from "express";
import PromotionController from "../controllers/promotion.controller.js";

const router = Router();
const controller = new PromotionController();

router.get("/", controller.getAllPromotions.bind(controller));
router.get("/:id", controller.getPromotionById.bind(controller));
router.post("/", controller.createPromotion.bind(controller));
router.put("/:id", controller.updatePromotion.bind(controller));
router.delete("/:id", controller.deletePromotion.bind(controller));

export default router;
