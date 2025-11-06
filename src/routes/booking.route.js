import express from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../database/models/index.js";
import { jwt } from "../middlewares/auth.js";
import BookingController from "../controllers/booking.controller.js";


const router = express.Router();
const controller = new BookingController();
router.get("/", controller.getAllBookings.bind(controller));
// router.get("/:id", controller.getBookingById.bind(controller));
// router.post("/", controller.createBookings.bind(controller));
// router.put("/:id", controller.updateBookings.bind(controller));
// router.delete("/:id", controller.deleteBookings.bind(controller));
// ✅ Xem danh sách đặt phòng của user hiện tại
router.get("/my-bookings", jwt(), controller.getUserBookings.bind(controller));

// Chỉ cho user đăng nhập mới đặt phòng
router.post("/", jwt(), async (req, res) => {
    try {
        const { room_id, start_date, end_date, quantity, total_price } = req.body;

        if (!room_id || !start_date || !end_date) {
            return res.status(400).json({ error: "Thiếu thông tin đặt phòng" });
        }

        const user_id = req.user?.id || req.user?.sub;
        if (!user_id) {
            return res.status(401).json({ error: "Không xác định được người dùng" });
        }

        const newBooking = await db.Booking.create({
            id: uuidv4(),
            user_id,
            room_id,
            start_date,
            end_date,
            quantity: quantity || 1,
            total_price,
            status: "confirmed",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        res.status(201).json({
            message: "✅ Đặt phòng thành công!",
            data: newBooking,
        });
    } catch (error) {
        console.error("❌ Lỗi khi tạo booking:", error);
        res.status(500).json({ error: "Lỗi server khi tạo đơn đặt phòng" });
    }
});

// 🧾 Xem chi tiết 1 đơn booking
router.get("/:id", jwt(), async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await db.Booking.findOne({
            where: { id },
            include: [
                {
                    model: db.Room,
                    as: "room",
                    attributes: ["name", "price", "description"],
                },
            ],
        });

        if (!booking) {
            return res.status(404).json({ error: "Không tìm thấy đơn đặt phòng" });
        }

        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        console.error("❌ Lỗi khi xem chi tiết booking:", error);
        res.status(500).json({ error: "Lỗi server khi xem chi tiết đặt phòng" });
    }
});

// Kiểm tra user đã đặt và hoàn tất phòng này chưa
router.get("/check/:roomId", jwt(), async (req, res) => {
    try {
        const user_id = req.user.id || req.user.sub; // đảm bảo lấy đúng user
        const { roomId } = req.params;

        const booking = await db.Booking.findOne({
            where: {
                user_id,
                room_id: roomId,
                status: "completed", // chỉ hoàn tất mới cho đánh giá
            },
        });

        res.status(200).json({ hasBooked: !!booking });
    } catch (err) {
        console.error("Error checking booking:", err);
        res.status(500).json({ hasBooked: false });
    }
});



export default router;
