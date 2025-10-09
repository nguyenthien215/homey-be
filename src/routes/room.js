// import { Router } from "express";
// import RoomController from "../controllers/room.controller.js";

// const router = Router();
// const controller = new RoomController();

// // Public routes: ai cũng xem được
// router.get("/", controller.getAll.bind(controller));
// router.get("/:id", controller.getById.bind(controller));

// export default router;

// src/routes/room.js
import express from "express";
import { getAllRooms } from "../controllers/room.controller.js";

const router = express.Router();

router.get("/", getAllRooms);

export default router;

