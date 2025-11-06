import db from "../database/models/index.js";
const { Bookings, Payments } = db;
import PaymentService from "../services/payment.service.js";

export default class PaymentController {
    constructor() {
        this.service = new PaymentService(); // ✅ khởi tạo service
    }


    // ✅ API: POST /api/v1/payments
    async createPayment(req, res) {
        try {
            const { booking_id, amount, method, status } = req.body;

            const payment = await db.Payment.create({
                booking_id,
                amount,
                method,
                status,
            });

            return res.status(201).json({ message: "Thanh toán thành công!", data: payment });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Lỗi server khi thanh toán" });
        }
    }

    // ✅ API: POST /api/v1/payments/mock
    async mockPayment(req, res) {
        try {
            const { user_id, room_id, start_date, end_date, total_price } = req.body;

            const booking = await Bookings.create({
                user_id,
                room_id,
                start_date,
                end_date,
                quantity: 1,
                total_price,
                status: "confirmed",
            });

            const payment = await Payments.create({
                booking_id: booking.id,
                method: "Credit Card (Demo)",
                amount: total_price,
                status: "paid",
            });

            return res.json({
                success: true,
                bookingId: booking.id,
                paymentId: payment.id,
            });
        } catch (err) {
            console.error("mockPayment error:", err);
            return res.status(500).json({ success: false, message: "Lỗi server" });
        }
    }

    //  API: GET /api/v1/payments/status/:bookingId
    async getStatus(req, res) {
        try {
            const { bookingId } = req.params;
            const payment = await Payments.findOne({ where: { booking_id: bookingId } });
            if (!payment) return res.json({ paid: false });
            return res.json({ paid: payment.status === "paid" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ paid: false });
        }
    }


    async getAllPayments(req, res) {
        try {
            const payments = await this.service.getAllPayments(req);
            res.status(200).json(payments);
        } catch (error) {
            console.error("❌ Error fetching payments:", error);
            res.status(500).json({ message: "Error fetching payments" });
        }
    }

    async getPaymentById(req, res) {
        try {
            const { id } = req.params;
            const payment = await this.service.getPaymentById(id);
            res.json(payment);
        } catch (error) {
            console.error("❌ Error fetching payment:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async editPayment(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            await this.service.editPayment(id, data);
            return res.status(200).json({ status: true });
        } catch (error) {
            console.error("❌ Error editing payment:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async deletePayment(req, res) {
        try {
            const { id } = req.params;
            await this.service.deletePayment(id);
            return res.status(200).json({ status: true });
        } catch (error) {
            console.error("❌ Error deleting payment:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
