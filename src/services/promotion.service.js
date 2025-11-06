import PromotionRepository from "../repositories/promotion.repository.js";

class PromotionService {
    constructor() {
        this.repository = new PromotionRepository();
    }

    // Lấy tất cả khuyến mãi
    async getAllPromotions(req) {
        try {
            return await this.repository.getAllPromotions(req);
        } catch (error) {
            throw new Error("Error fetching promotions: " + error.message);
        }
    }

    // Lấy chi tiết khuyến mãi theo ID
    async getPromotionById(id) {
        try {
            const promotion = await this.repository.getPromotionById(id);
            if (!promotion) throw new Error("Promotion not found");
            return promotion;
        } catch (error) {
            throw new Error("Error fetching promotion: " + error.message);
        }
    }

    // Tạo khuyến mãi mới
    async createPromotion(data) {
        try {
            return await this.repository.createPromotion(data);
        } catch (error) {
            throw new Error("Error creating promotion: " + error.message);
        }
    }

    // Chỉnh sửa khuyến mãi
    async updatePromotion(id, data) {
        try {
            const promotion = await this.repository.getPromotionById(id);
            if (!promotion) throw new Error("Promotion not found");
            return await this.repository.updatePromotion(id, data);
        } catch (error) {
            throw new Error("Error updating promotion: " + error.message);
        }
    }

    // Xóa khuyến mãi
    async deletePromotion(id) {
        try {
            const promotion = await this.repository.getPromotionById(id);
            if (!promotion) throw new Error("Promotion not found");
            return await this.repository.deletePromotion(id);
        } catch (error) {
            throw new Error("Error deleting promotion: " + error.message);
        }
    }
}

export default PromotionService;
