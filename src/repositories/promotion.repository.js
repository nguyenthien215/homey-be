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
                // sortField = "createdAt",
                // sortOrder = "DESC",
            } = req.query;

            const limit = Math.max(parseInt(pageSize), 1);
            const offset = (Math.max(parseInt(page), 1) - 1) * limit;

            // Đếm tổng số user thỏa điều kiện search
            const count = await this.model.count({
                where: {
                    code: {
                        [Op.like]: `%${search}%`,
                    },
                },
            });

            // Lấy danh sách user
            const rows = await db.sequelize.query(
                `
          SELECT id, code, discount_type, discount_value, start_date, end_date, status, createdAt, updatedAt
          FROM promotions
                `,
                {
                    bind: {
                        limit,
                        offset,
                        search: `%${search}%`,
                    },
                    type: QueryTypes.SELECT,
                }
            );

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

    //   async getUserById(id, includeRefreshToken = false) {
    //     try {
    //       return await (includeRefreshToken
    //         ? this.model.findByPk(id, { include: db.RefreshToken })
    //         : db.sequelize.query("SELECT * from users WHERE id = $id", {
    //             bind: { id },
    //             type: QueryTypes.SELECT,
    //           }));
    //     } catch (error) {
    //       throw new Error("Error fetching user: " + error.message);
    //     }
    //   }

    // 🔹 Tạo khuyến mãi mới
    async createPromotion(data) {
        try {
            const id = uuidv4();
            const {
                code,
                discount_type,
                discount_value,
                start_date,
                end_date,
                status,
            } = data;

            await db.sequelize.query(
                `
            INSERT INTO promotions (id, code, discount_type, discount_value, start_date, end_date, status, createdAt, updatedAt)
            VALUES (:id, :code, :discount_type, :discount_value, :start_date, :end_date, :status, NOW(), NOW())
            `,
                {
                    replacements: {
                        id,
                        code,
                        discount_type,
                        discount_value,
                        start_date,
                        end_date,
                        status,
                    },
                    type: QueryTypes.INSERT,
                }
            );

            return { id };
        } catch (error) {
            throw new Error("Error creating promotion: " + error.message);
        }
    }


    // 🔹 Cập nhật khuyến mãi
    async updatePromotion(id, data) {
        try {
            const fields = [];
            const replacements = { id };

            for (const [key, value] of Object.entries(data)) {
                if (value !== undefined) {
                    fields.push(`${key} = :${key}`);
                    replacements[key] = value;
                }
            }

            if (fields.length === 0) throw new Error("No data provided for update");

            const query = `
                UPDATE promotions
                SET ${fields.join(", ")}, updatedAt = NOW()
                WHERE id = :id
            `;

            await db.sequelize.query(query, { replacements, type: QueryTypes.UPDATE });
            return { message: "Promotion updated successfully" };
        } catch (error) {
            throw new Error("Error updating promotion: " + error.message);
        }
    }

    // 🔹 Xóa khuyến mãi
    async deletePromotion(id) {
        try {
            await db.sequelize.query(`DELETE FROM promotions WHERE id = :id`, {
                replacements: { id },
                type: QueryTypes.DELETE,
            });
            return { message: "Promotion deleted successfully" };
        } catch (error) {
            throw new Error("Error deleting promotion: " + error.message);
        }
    }
}

export default PromotionRepository;
