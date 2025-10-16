import express from "express";
import {
    getAllRooms,
    getRoomsByCategory,
    getRoomById,
    getRoomDetailById,
} from "../controllers/room.controller.js";

const router = express.Router();

router.get("/room-detail/:id", getRoomDetailById);
router.get("/category/:categoryId", getRoomsByCategory);
router.get("/", getAllRooms);
router.get("/:id", getRoomById);

export default router;
