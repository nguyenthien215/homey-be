import { Router } from "express";
import multer from "multer";
import path from "path";
import UploadController from "../controllers/upload.controller.js";

// config nơi lưu file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // thư mục lưu file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // tên file = timestamp + đuôi
  },
});
const upload = multer({ storage });
const controller = new UploadController();
const router = Router();
// define the auth route
router.post("/", upload.array("files", 5), controller.upload);

export default router;
