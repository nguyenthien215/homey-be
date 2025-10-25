import BookingService from "../services/booking.service.js";
import BaseController from "./base.controller.js";

class BookingController extends BaseController {
    constructor() {
        super();
        this.service = new BookingService();
    }

    /** -------------------- ADMIN -------------------- **/

    // 🧩 Lấy toàn bộ danh sách booking (admin xem tất cả)
    async getAllBookings(req, res) {
        try {
            const bookings = await this.service.getAllBookings(req);
            return res.status(200).json({
                success: true,
                data: bookings,
            });
        } catch (error) {
            console.error("Error fetching bookings:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    /** -------------------- USER -------------------- **/

    // 🧾 Tạo booking mới (user đặt phòng)
    async createBooking(req, res) {
        try {
            const user_id = req.user?.id; // lấy user từ token (auth middleware)
            const { room_id, start_date, end_date, quantity, total_price } = req.body;

            if (!user_id) {
                return res.status(401).json({ error: "Bạn cần đăng nhập để đặt phòng" });
            }

            if (!room_id || !start_date || !end_date || !quantity || !total_price) {
                return res.status(400).json({ error: "Thiếu thông tin đặt phòng" });
            }

            const newBooking = await this.service.createBooking({
                user_id,
                room_id,
                start_date,
                end_date,
                quantity,
                total_price,
            });

            return res.status(201).json({
                success: true,
                message: "Đặt phòng thành công!",
                data: newBooking,
            });
        } catch (error) {
            console.error("Error creating booking:", error);
            return res.status(500).json({ error: "Internal Server Error" });
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

    // ❌ Hủy đặt phòng (user hoặc admin)
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

    // ✅ Xác nhận đặt phòng (admin)
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

    // ✅ Đánh dấu hoàn thành (admin)
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

// async getCategoryById(req, res) {
//   try {
//     const { id } = req.params;
//     const category = await this.service.getCategoryById(id);
//     res.json(category);
//   } catch (error) {
//     console.error("Error fetching category:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// async createCategory(req, res) {
//   try {
//     const data = req.body;
//     await this.service.createCategory(data);
//     return res.status(200).json({ status: true });
//   } catch (error) {
//     console.error("Error creating category:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// async editCategory(req, res) {
//   try {
//     const { id } = req.params;
//     const data = req.body;
//     await this.service.editCategory(id, data);
//     return res.status(200).json({ status: true });
//   } catch (error) {
//     console.error("Error creating category:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// async deleteCategory(req, res) {
//   try {
//     const { id } = req.params;
//     await this.service.deleteCategory(id);
//     return res.status(200).json({ status: true });
//   } catch (error) {
//     console.error("Error dalete category:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

