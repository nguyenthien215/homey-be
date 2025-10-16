import express from "express";
import CategoryController from "../controllers/category.controller.js";

const router = express.Router();

router.get("/", CategoryController.getAllCategories.bind(CategoryController));

export default router;
