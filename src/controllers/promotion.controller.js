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

    async getPromotionById(req, res) {
        try {
            const { id } = req.params;
            const promotion = await this.service.getPromotionById(id);
            res.json({ success: true, data: promotion });
        } catch (error) {
            console.error("❌ Error fetching promotion:", error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async createPromotion(req, res) {
        try {
            const data = req.body;
            const newPromotion = await this.service.createPromotion(data);
            res.status(201).json({ success: true, data: newPromotion });
        } catch (error) {
            console.error("❌ Error creating promotion:", error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async updatePromotion(req, res) {
        try {
            const { id } = req.params;
            const updated = await this.service.updatePromotion(id, req.body);
            res.json({ success: true, data: updated });
        } catch (error) {
            console.error("❌ Error updating promotion:", error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async deletePromotion(req, res) {
        try {
            const { id } = req.params;
            await this.service.deletePromotion(id);
            res.json({ success: true, message: "Promotion deleted" });
        } catch (error) {
            console.error("❌ Error deleting promotion:", error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

export default PromotionController;
