// src/repositories/room.repository.js
import { Op } from "sequelize";
import db from "../database/models/index.js";

class RoomRepository {
    constructor() {
        this.model = db.Room;
    }

    //  Lấy tất cả phòng (có phân trang)
    async getAllRooms(req) {
        try {
            const page = Number(req.query.page) > 0 ? Number(req.query.page) : 1;
            const pageSize = Number(req.query.pageSize) > 0 ? Number(req.query.pageSize) : 6;
            const limit = pageSize;
            const offset = (page - 1) * limit;

            const { count, rows } = await this.model.findAndCountAll({
                order: [["createdAt", "DESC"]],
                limit,
                offset,
                attributes: ["id", "name", "description", "price", "image_url", "stock", "category_id"],
                include: [
                    {
                        model: db.Category,
                        as: "category",
                        attributes: ["id", "name"],
                    },
                    {
                        model: db.City,
                        as: "city",
                        attributes: ["id", "name"],
                    },
                ],
            });

            const data = rows.map((r, idx) => {
                const room = r.toJSON();

                // Parse image_url nếu là string
                if (typeof room.image_url === "string") {
                    try {
                        room.image_url = JSON.parse(room.image_url);
                    } catch {
                        room.image_url = [room.image_url];
                    }
                }

                // Thêm số thứ tự theo pagination
                room.index = offset + idx + 1;

                return room;
            });


            return {
                data,
                pagination: { total: count, page, pageSize },
            };
        } catch (error) {
            console.error("❌ RoomRepository.getAllRooms:", error);
            throw new Error("Error fetching rooms: " + error.message);
        }
    }

    // Lấy phòng theo ID
    async getRoomById(id) {
        try {
            const room = await this.model.findByPk(id, {
                include: [
                    { model: db.Category, as: "category", attributes: ["id", "name"] },
                    { model: db.City, as: "city", attributes: ["id", "name"] },
                    { model: db.RoomDetail, as: "room_detail" },
                ],
            });

            if (!room) throw new Error("Không tìm thấy phòng");

            const r = room.toJSON();
            if (typeof r.image_url === "string") {
                try {
                    r.image_url = JSON.parse(r.image_url);
                } catch {
                    r.image_url = [r.image_url];
                }
            }
            return r;
        } catch (error) {
            console.error("❌ RoomRepository.getRoomById:", error);
            throw new Error("Error fetching room: " + error.message);
        }
    }

    // Lấy chi tiết phòng theo room_id
    async getRoomDetailById(roomId) {
        try {
            const detail = await db.RoomDetail.findOne({
                where: { room_id: roomId },
                include: [
                    {
                        model: db.Room,
                        as: "room", // alias đúng theo model
                        include: [
                            { model: db.Category, as: "category", attributes: ["id", "name"] },
                            { model: db.City, as: "city", attributes: ["id", "name"] },
                        ],
                    },
                ],
            });

            if (!detail) throw new Error("Không tìm thấy chi tiết phòng cho room_id: " + roomId);
            return detail;
        } catch (error) {
            console.error("❌ RoomRepository.getRoomDetailById:", error);
            throw new Error("Error fetching room detail: " + error.message);
        }
    }


    // ✅ Lấy danh sách phòng theo category_id
    async getRoomsByCategory(categoryId) {
        try {
            if (!categoryId) throw new Error("Thiếu categoryId");

            const rooms = await this.model.findAll({
                where: { category_id: categoryId },
                order: [["createdAt", "DESC"]],
                attributes: ["id", "name", "description", "price", "image_url", "category_id"],
                include: [
                    { model: db.Category, as: "category", attributes: ["id", "name"] },
                    { model: db.City, as: "city", attributes: ["id", "name"] },
                    { model: db.RoomDetail, as: "room_detail" },
                ],
            });

            const data = rooms.map((r) => {
                const room = r.toJSON();
                if (typeof room.image_url === "string") {
                    try {
                        room.image_url = JSON.parse(room.image_url);
                    } catch {
                        room.image_url = [room.image_url];
                    }
                }
                return room;
            });

            return data;
        } catch (error) {
            console.error("❌ Lỗi khi lấy phòng theo category:", error);
            throw new Error("Error fetching rooms by category: " + error.message);
        }
    }

    //  Tạo mới phòng
    async createRoom(data) {
        try {
            if (!data.category_id) throw new Error("category_id là bắt buộc");
            return await this.model.create(data);
        } catch (error) {
            throw new Error("Error creating room: " + error.message);
        }
    }

    // ✅ Cập nhật phòng
    async editRoom(id, data) {
        try {
            const room = await this.getRoomById(id);
            if (!room) throw new Error("Room not found");
            return await this.model.update(data, { where: { id } });
        } catch (error) {
            throw new Error("Error updating room: " + error.message);
        }
    }

    // ✅ Xóa phòng
    async deleteRoom(id) {
        try {
            const room = await this.getRoomById(id);
            if (!room) throw new Error("Room not found");
            return await this.model.destroy({ where: { id } });
        } catch (error) {
            throw new Error("Error deleting room: " + error.message);
        }
    }
}

export default RoomRepository;






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



