import PromotionService from "../services/promotion.service.js";
import BaseController from "./base.controller.js";

class PromotionController extends BaseController {
    constructor() {
        super();
        this.service = new PromotionService();
    }

    // Lấy tất cả khuyến mãi
    async getAllPromotions(req, res) {
        try {
            const promotions = await this.service.getAllPromotions(req);
            res.json(promotions);
        } catch (error) {
            console.error("Error fetching promotions:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // Lấy chi tiết 1 khuyến mãi theo ID
    async getPromotionById(req, res) {
        try {
            const { id } = req.params;
            const promotion = await this.service.getPromotionById(id);
            if (!promotion) {
                return res.status(404).json({ error: "Promotion not found" });
            }
            res.json(promotion);
        } catch (error) {
            console.error("Error fetching promotion:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // Tạo mới khuyến mãi
    async createPromotion(req, res) {
        try {
            const data = req.body;
            const newPromotion = await this.service.createPromotion(data);
            return res.status(201).json({
                status: true,
                message: "Promotion created successfully",
                promotion: newPromotion,
            });
        } catch (error) {
            console.error("Error creating promotion:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // Cập nhật khuyến mãi
    async editPromotion(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedPromotion = await this.service.editPromotion(id, data);
            return res.status(200).json({
                status: true,
                message: "Promotion updated successfully",
                promotion: updatedPromotion,
            });
        } catch (error) {
            console.error("Error updating promotion:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // Xóa khuyến mãi
    async deletePromotion(req, res) {
        try {
            const { id } = req.params;
            await this.service.deletePromotion(id);
            return res
                .status(200)
                .json({ status: true, message: "Promotion deleted successfully" });
        } catch (error) {
            console.error("Error deleting promotion:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default PromotionController;
