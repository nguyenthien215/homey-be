
import { Router } from "express";
import multer from "multer";
import path from "path";
import CategoryController from "../controllers/category.controller.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/img/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });
const controller = new CategoryController();
const router = Router();

// define the about route
router.get("/", controller.getAllCategories.bind(controller));
router.post("/", upload.array("images", 5), controller.createCategory.bind(controller));
router.delete("/:id", controller.deleteCategory.bind(controller));
router.get("/:id", controller.getCategoryById.bind(controller));
router.put("/:id", upload.array("images", 5), controller.editCategory.bind(controller));

export default router;