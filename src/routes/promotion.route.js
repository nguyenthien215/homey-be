import { Router } from "express";
import PromotionController from "../controllers/promotion.controller.js";

const router = Router();
const controller = new PromotionController();

// Lấy tất cả khuyến mãi
router.get("/", controller.getAllPromotions.bind(controller));

// Lấy chi tiết 1 khuyến mãi theo ID
router.get("/:id", controller.getPromotionById.bind(controller));

// Tạo mới khuyến mãi
router.post("/", controller.createPromotion.bind(controller));

// Cập nhật khuyến mãi
router.put("/:id", controller.editPromotion.bind(controller));

// Xóa khuyến mãi
router.delete("/:id", controller.deletePromotion.bind(controller));

export default router;
