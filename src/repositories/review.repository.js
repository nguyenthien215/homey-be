import { Op, QueryTypes } from "sequelize";
import db from "../database/models/index.js";
import { v4 as uuidv4 } from "uuid";
import { getExpiresAtFromToken } from "../helpers/jwt.js";

class ReviewRepository {
    constructor() {
        this.model = db.Review; // Initialize the User model
    }

    async getAllReviews(req) {
        try {
            const {
                page = 1,
                pageSize = 5,
                search = "",
                sortField = "createdAt",
                sortOrder = "DESC",
            } = req.query;

            const limit = Math.max(parseInt(pageSize), 1);
            const offset = (Math.max(parseInt(page), 1) - 1) * limit;

            // Count tổng số review
            const count = await this.model.count({
                where: {
                    comment: {
                        [Op.like]: `%${search}%`,
                    },
                },
            });

            // Query join user và room
            const rows = await db.sequelize.query(
                `
            SELECT r.id, r.rating, r.comment, r.createdAt, r.updatedAt,
                   u.userName AS user_name,
                   rm.name AS room_name
            FROM reviews r
            JOIN users u ON r.user_id = u.id
            JOIN rooms rm ON r.room_id = rm.id
            WHERE r.comment LIKE :search
            ORDER BY ${sortField} ${sortOrder}
            LIMIT :limit OFFSET :offset
            `,
                {
                    replacements: { search: `%${search}%`, limit, offset },
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
            throw new Error("Error fetching reviews: " + error.message);
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

    //   async createUser(userData) {
    //     try {
    //       return await db.sequelize.query(
    //         "INSERT INTO users (id, name, email, passwordHash) VALUES (:id, :name, :email, :passwordHash)",
    //         {
    //           replacements: {
    //             id: uuidv4(),
    //             name: userData.name,
    //             email: userData.email,
    //             passwordHash: userData.passwordHash,
    //           },
    //           type: QueryTypes.INSERT,
    //         }
    //       );
    //     } catch (error) {
    //       throw new Error("Error creating user: " + error.message);
    //     }
    //   }

    //   async updateUser(id, data, updateRefreshToken = false) {
    //     const { refreshToken: token, ...userData } = data;
    //     try {
    //       const user = await this.getUserById(id, updateRefreshToken);
    //       if (!user) throw new Error("User not found");

    //       if (updateRefreshToken) {
    //         await this._updateOrCreateRefreshToken(user, token);
    //         return user;
    //       } else {
    //         const result = await db.sequelize.query(
    //           `UPDATE users
    // SET name=:name, email=:email, passwordHash=:passwordHash
    // WHERE id=:id`,
    //           {
    //             replacements: {
    //               id,
    //               name: userData.name,
    //               email: userData.email,
    //               passwordHash: "",
    //             },
    //             type: QueryTypes.UPDATE,
    //           }
    //         );
    //         return result;
    //       }
    //     } catch (error) {
    //       throw new Error("Error updating user: " + error.message);
    //     }
    //   }

    //   async deleteUser(id) {
    //     try {
    //       const user = await this.getUserById(id);
    //       if (!user) throw new Error("User not found");
    //       return await db.sequelize.query(`DELETE FROM users WHERE id=:id`, {
    //         replacements: {
    //           id,
    //         },
    //         type: QueryTypes.DELETE,
    //       });
    //     } catch (error) {
    //       throw new Error("Error deleting user: " + error.message);
    //     }
    //   }

    //   async getUserByEmail(email, withPassword = false) {
    //     try {
    //       const user = withPassword
    //         ? await this.model.scope("withPassword").findOne({
    //             where: {
    //               email,
    //             },
    //           })
    //         : await this.model.findOne({
    //             where: {
    //               email,
    //             },
    //           });
    //       return user;
    //     } catch (error) {
    //       throw new Error("Error check user existed: " + error.message);
    //     }
    //   }

    //   async _updateOrCreateRefreshToken(user, token) {
    //     try {
    //       // Get expiresAt from JWT
    //       const expiresAt = getExpiresAtFromToken(token);

    //       if (user.RefreshToken) {
    //         await user.RefreshToken.update({
    //           userId: user.id,
    //           token,
    //           expiresAt,
    //         });
    //       } else {
    //         await user.createRefreshToken({ token, expiresAt });
    //       }
    //     } catch (error) {
    //       throw new Error("Error check user existed: " + error.message);
    //     }
    //   }
}

export default ReviewRepository;