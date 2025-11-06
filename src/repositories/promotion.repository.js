import { Op, QueryTypes } from "sequelize";
import db from "../database/models/index.js";
import { v4 as uuidv4 } from "uuid";
import { getExpiresAtFromToken } from "../helpers/jwt.js";

class PromotionRepository {
    constructor() {
        this.model = db.Promotion; // Initialize the User model
    }

    async getAllPromotions(req) {
        try {
            const {
                page = 1,
                pageSize = 5,
                search = "",
            } = req.query;

            const limit = Math.max(parseInt(pageSize), 1);
            const offset = (Math.max(parseInt(page), 1) - 1) * limit;

            // Điều kiện where cho search
            const whereCondition = search ? {
                [Op.or]: [
                    { code: { [Op.like]: `%${search}%` } },
                    { discount_type: { [Op.like]: `%${search}%` } },
                    { status: { [Op.like]: `%${search}%` } }
                ]
            } : {};

            // Đếm tổng số promotion thỏa điều kiện search
            const count = await this.model.count({ where: whereCondition });

            // Lấy danh sách promotion với pagination
            const rows = await this.model.findAll({
                where: whereCondition,
                order: [["createdAt", "DESC"]],
                limit,
                offset,
            });

            return {
                data: rows,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    pageSize: limit,
                    totalPages: Math.ceil(count / limit) || 1,
                },
            };
        } catch (error) {
            throw new Error("Error fetching promotions: " + error.message);
        }
    }

    async getPromotionById(id) {
        const promotion = await this.model.findByPk(id);
        if (!promotion) throw new Error("Promotion not found");
        return promotion;
    }

    async createPromotion(data) {
        const id = uuidv4();
        const newPromotion = await this.model.create({
            id,
            code: data.code,
            discount_type: data.discount_type,
            discount_value: data.discount_value,
            start_date: data.start_date,
            end_date: data.end_date,
            status: data.status || "active",
        });
        return newPromotion;
    }


    async updatePromotion(id, data) {
        const promotion = await this.model.findByPk(id);
        if (!promotion) throw new Error("Promotion not found");

        const updated = await promotion.update({
            code: data.code ?? promotion.code,
            discount_type: data.discount_type ?? promotion.discount_type,
            discount_value: data.discount_value ?? promotion.discount_value,
            start_date: data.start_date ?? promotion.start_date,
            end_date: data.end_date ?? promotion.end_date,
            status: data.status ?? promotion.status,
        });

        return updated;
    }

    async deletePromotion(id) {
        const promotion = await this.model.findByPk(id);
        if (!promotion) throw new Error("Promotion not found");
        await this.model.destroy({ where: { id } });
        return true;
    }
}

export default PromotionRepository;
