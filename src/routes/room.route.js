// src/routes/room.route.js
import { Router } from "express";
import RoomController from "../controllers/room.controller.js";

const router = Router();
const controller = new RoomController();

router.get("/room-detail/:id", controller.getRoomDetailById);
router.get("/category/:categoryId", controller.getRoomsByCategory);
router.get("/", controller.getAllRooms.bind(controller));
router.get("/:id", controller.getRoomById.bind(controller));
router.post("/", controller.createRoom.bind(controller));
router.delete("/:id", controller.deleteRoom.bind(controller));
router.put("/:id", controller.updateRoom.bind(controller));
export default router;
