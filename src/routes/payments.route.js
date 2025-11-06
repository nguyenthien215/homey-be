import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../database/models/index.js";
import { jwt } from "../middlewares/auth.js";
import PaymentController from "../controllers/payment.controller.js";
const router = Router();

const controller = new PaymentController();

// ➕ Tạo thanh toán
router.post("/", jwt(), async (req, res) => {
    try {
        const { booking_id, method, amount, status } = req.body;

        if (!booking_id || !method || !amount) {
            return res.status(400).json({ error: "Thiếu thông tin thanh toán" });
        }

        const newPayment = await db.Payment.create({
            id: uuidv4(),
            booking_id,
            method,
            amount,
            status: status || "paid",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return res.status(201).json({
            success: true,
            message: "✅ Thanh toán thành công!",
            data: newPayment,
        });
    } catch (error) {
        console.error("❌ Lỗi khi tạo payment:", error);
        return res.status(500).json({ error: "Lỗi server khi tạo payment" });
    }
});

// ✅ (tùy chọn) kiểm tra trạng thái thanh toán
router.get("/status/:bookingId", jwt(), async (req, res) => {
    try {
        const payment = await db.Payment.findOne({
            where: { booking_id: req.params.bookingId },
        });
        if (!payment) {
            return res.status(404).json({ error: "Không tìm thấy thanh toán" });
        }
        return res.json(payment);
    } catch (error) {
        console.error("❌ Lỗi khi kiểm tra trạng thái:", error);
        return res.status(500).json({ error: "Lỗi server" });
    }
});


router.get("/", controller.getAllPayments.bind(controller));
router.get("/:id", controller.getPaymentById.bind(controller));
router.put("/:id", controller.editPayment.bind(controller));
router.delete("/:id", controller.deletePayment.bind(controller));

export default router;
