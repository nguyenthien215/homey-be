import { Router } from "express";
import ReviewController from "../controllers/review.controller.js";
// import middlewares from "../middlewares/index.js";

const controller = new ReviewController();
const router = Router();
// define the about route
router.get("/", controller.getAllReviews);
// router.post("/", controller.createUser);
// router.delete("/:id", controller.deleteUser);
// router.get("/:id", controller.getUserById);
// router.put("/:id", controller.editUser);

export default router;