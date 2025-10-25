import { Router } from "express";
import BookingController from "../controllers/booking.controller.js";
import { jwt } from "../middlewares/auth.js";

const router = Router();
const controller = new BookingController();

// ADMIN
router.get("/", jwt(), controller.getAllBookings.bind(controller));

//  USER
router.post("/", jwt(), controller.createBooking.bind(controller));
router.get("/my-bookings", jwt(), controller.getUserBookings.bind(controller));
router.put("/:id/cancel", jwt(), controller.cancelBooking.bind(controller));

//  ADMIN ACTIONS
router.put("/:id/confirm", jwt(), controller.confirmBooking.bind(controller));
router.put("/:id/complete", jwt(), controller.completeBooking.bind(controller));

export default router;


// router.post("/", controller.createUser);
// router.delete("/:id", controller.deleteUser);
// router.get("/:id", controller.getUserById);
// router.put("/:id", controller.editUser);