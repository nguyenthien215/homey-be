import { Router } from "express";
import ReviewController from "../controllers/review.controller.js";
// import middlewares from "../middlewares/index.js";

const controller = new ReviewController();
const router = Router();

// Lấy tất cả review theo room_id
router.get("/room/:roomId", controller.getReviewsByRoom.bind(controller));

// Thêm review từ người dùng
router.post("/user", controller.createUserReview.bind(controller));

// define the about route
router.get("/", controller.getAllReviews.bind(controller));
router.post("/", controller.createReviews.bind(controller));
router.delete("/:id", controller.deleteReviews.bind(controller));
router.get("/:id", controller.getReviewById.bind(controller));
router.put("/:id", controller.updateReviews.bind(controller));

export default router;