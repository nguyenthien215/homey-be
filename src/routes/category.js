import { Router } from "express";
import CategoryController from "../controllers/category.controller.js";

const controller = new CategoryController();
const router = Router();
// define the about route
router.get("/", controller.getAllCategories);
router.post("/", controller.createCategory);
router.delete("/:id", controller.deleteCategory);
router.get("/:id", controller.getCategoryById);
router.put("/:id", controller.editCategory);

export default router;
