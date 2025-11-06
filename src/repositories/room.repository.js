// src/repositories/room.repository.js
import { Op } from "sequelize";
import db from "../database/models/index.js";
import { v4 as uuidv4 } from "uuid";

class RoomRepository {
    constructor() {
        this.model = db.Room;
    }

    //  Lấy tất cả phòng (có phân trang và search)
    async getAllRooms(req) {
        try {
            const page = Number(req.query.page) > 0 ? Number(req.query.page) : 1;
            const pageSize = Number(req.query.pageSize) > 0 ? Number(req.query.pageSize) : 6;
            const search = req.query.search || "";
            const limit = pageSize;
            const offset = (page - 1) * limit;

            // Điều kiện where cho search
            const whereCondition = search ? {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { description: { [Op.like]: `%${search}%` } }
                ]
            } : {};

            const { count, rows } = await this.model.findAndCountAll({
                where: whereCondition,
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
                    {
                        model: db.User,
                        as: "user",
                        attributes: ["id", "userName"],
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
            const id = uuidv4();

            const newRoom = await this.model.create({
                id,
                name: data.name,
                description: data.description, // bắt buộc
                price: data.price,
                stock: data.stock,
                category_id: data.category_id,
                city_id: data.city_id,         // bắt buộc
                user_id: data.user_id,         // nếu có
                image_url: data.image_url || [],
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            return newRoom;
        } catch (error) {
            console.error("❌ RoomRepository.createRoom:", error);
            throw new Error("Error creating room in repository: " + error.message);
        }
    }

    // ✅ Cập nhật phòng
    async updateRoom(id, data) {
        try {
            // Lấy instance trực tiếp từ model
            const room = await this.model.findByPk(id);
            if (!room) throw new Error("Room not found");

            // Cập nhật các trường cho phép
            const updatedRoom = await room.update({
                name: data.name ?? room.name,
                description: data.description ?? room.description,
                price: data.price ?? room.price,
                stock: data.stock ?? room.stock,
                category_id: data.category_id ?? room.category_id,
                city_id: data.city_id ?? room.city_id,
                user_id: data.user_id ?? room.user_id,
                image_url: data.image_url ?? room.image_url,
            });

            // Parse image_url nếu cần
            if (typeof updatedRoom.image_url === "string") {
                try {
                    updatedRoom.image_url = JSON.parse(updatedRoom.image_url);
                } catch {
                    updatedRoom.image_url = [updatedRoom.image_url];
                }
            }

            return updatedRoom;
        } catch (error) {
            console.error("❌ RoomRepository.updateRoom:", error);
            throw new Error("Error updating room: " + error.message);
        }
    }


    async deleteRoom(id) {
        try {
            const room = await this.model.findByPk(id); // lấy instance model trực tiếp
            if (!room) throw new Error("Room not found");

            await room.destroy(); // xóa Room
            return { success: true, message: "Room deleted successfully" };
        } catch (error) {
            throw new Error("Error deleting Room: " + error.message);
        }
    }
}

export default RoomRepository;