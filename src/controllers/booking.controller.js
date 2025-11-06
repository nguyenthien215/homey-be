import BookingService from "../services/booking.service.js";
import BaseController from "./base.controller.js";
import db from "../database/models/index.js";
import { v4 as uuidv4 } from "uuid";

class BookingController extends BaseController {
    constructor() {
        super();
        this.service = new BookingService();
    }

    async getAllBookings(req, res) {
        try {
            const bookings = await this.service.getAllBookings(req);
            res.status(200).json(bookings);
        } catch (error) {
            console.error("❌ Error fetching bookings:", error);
            res.status(500).json({ message: "Error fetching bookings" });
        }
    }

    // 🏨 Tạo booking mới
    async createBooking(req, res) {
        try {
            const { room_id, start_date, end_date, quantity, total_price, status } = req.body;
            const user_id = req.user.id;

            const booking = await db.Booking.create({
                user_id,
                room_id,
                start_date,
                end_date,
                quantity,
                total_price,
                status,
            });

            return res.status(201).json({ message: "Tạo booking thành công", data: booking });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Lỗi server" });
        }
    }

    // 📋 Lấy danh sách đặt phòng của người dùng hiện tại
    async getUserBookings(req, res) {
        try {
            const user_id = req.user?.id;
            if (!user_id) return res.status(401).json({ error: "Unauthorized" });

            const bookings = await this.service.getBookingsByUserId(user_id);
            return res.status(200).json({
                success: true,
                data: bookings,
            });
        } catch (error) {
            console.error("Error fetching user bookings:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // ❌ Hủy đặt phòng
    async cancelBooking(req, res) {
        try {
            const { id } = req.params;
            const booking = await this.service.cancelBooking(id);
            return res.status(200).json({
                success: true,
                message: "Đã hủy đặt phòng thành công",
                data: booking,
            });
        } catch (error) {
            console.error("Error cancelling booking:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // ✅ Xác nhận đặt phòng
    async confirmBooking(req, res) {
        try {
            const { id } = req.params;
            const booking = await this.service.updateStatus(id, "confirmed");
            return res.status(200).json({
                success: true,
                message: "Đơn đặt phòng đã được xác nhận",
                data: booking,
            });
        } catch (error) {
            console.error("Error confirming booking:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // ✅ Đánh dấu hoàn tất
    async completeBooking(req, res) {
        try {
            const { id } = req.params;
            const booking = await this.service.updateStatus(id, "completed");
            return res.status(200).json({
                success: true,
                message: "Đơn đặt phòng đã hoàn tất",
                data: booking,
            });
        } catch (error) {
            console.error("Error completing booking:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default BookingController;