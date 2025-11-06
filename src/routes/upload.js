import { Router } from "express";
import multer from "multer";
import path from "path";
import UploadController from "../controllers/upload.controller.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/img/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
const controller = new UploadController();
const router = Router();

router.post("/", upload.array("files", 5), controller.upload);

export default router;
