import { Router } from "express";
import RoomController from "../controllers/room.controller.js";

const router = Router();
const controller = new RoomController();

// define the about route
router.get("/room-detail/:id", controller.getRoomDetailById);
router.get("/category/:categoryId", controller.getRoomsByCategory);
router.get("/:id", controller.getRoomById);
router.get("/", controller.getAllRooms);
router.post("/", controller.createRoom);
router.put("/:id", controller.editRoom);
router.delete("/:id", controller.deleteRoom);


export default router;
