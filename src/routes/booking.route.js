import { Router } from "express";
import BookingController from "../controllers/booking.controller.js";
// import middlewares from "../middlewares/index.js";

const controller = new BookingController();
const router = Router();
// define the about route
router.get("/", controller.getAllBookings);
// router.post("/", controller.createUser);
// router.delete("/:id", controller.deleteUser);
// router.get("/:id", controller.getUserById);
// router.put("/:id", controller.editUser);

export default router;

