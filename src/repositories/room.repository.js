import { Op } from "sequelize";
import db from "../database/models/index.js";

class RoomRepository {
    constructor() {
        this.model = db.Room;
    }

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
                attributes: ["id", "name", "description", "price", "image_url"],
            });

            const data = rows.map((r) => {
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

            return {
                data,
                pagination: { total: count, page, pageSize },
            };
        } catch (error) {
            console.error("❌ RoomRepository Error:", error);
            throw new Error("Error fetching rooms: " + error.message);
        }
    }

    async getRoomById(id) {
        try {
            return await this.model.findByPk(id);
        } catch (error) {
            throw new Error("Error fetching room: " + error.message);
        }
    }

    async createRoom(data) {
        try {
            return await this.model.create(data);
        } catch (error) {
            throw new Error("Error creating room: " + error.message);
        }
    }

    async editRoom(id, data) {
        try {
            const room = await this.getRoomById(id);
            if (!room) throw new Error("Room not found");
            return await room.update(data);
        } catch (error) {
            throw new Error("Error updating room: " + error.message);
        }
    }

    async deleteRoom(id) {
        try {
            const room = await this.getRoomById(id);
            if (!room) throw new Error("Room not found");
            return await room.destroy();
        } catch (error) {
            throw new Error("Error deleting room: " + error.message);
        }
    }

    //    Lấy chi tiết phòng theo room_id
    async getRoomDetailById(roomId) {
        try {
            const detail = await db.RoomDetail.findOne({
                where: { room_id: roomId },
                include: [
                    {
                        model: db.Room,
                        as: "room",
                        attributes: ["id", "name", "price", "image_url", "description"],
                    },
                ],
            });

            if (!detail) throw new Error("Không tìm thấy chi tiết phòng cho room_id: " + roomId);

            return detail;
        } catch (error) {
            console.error("❌ Lỗi khi lấy chi tiết phòng:", error);
            throw new Error(error.message);
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



