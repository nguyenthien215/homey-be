// import db from "../database/models/index.js";

// export default class RoomController {
//     async getAll(req, res) {
//         try {
//             const rooms = await db.Room.findAll();
//             res.json(rooms);
//         } catch (error) {
//             console.error("Lỗi getAll rooms:", error);
//             res.status(500).json({ message: "Lỗi server" });
//         }
//     }

//     async getById(req, res) {
//         try {
//             const { id } = req.params;
//             const room = await db.Room.findByPk(id);
//             if (!room) {
//                 return res.status(404).json({ message: "Không tìm thấy phòng" });
//             }
//             res.json(room);
//         } catch (error) {
//             console.error("Lỗi getById room:", error);
//             res.status(500).json({ message: "Lỗi server" });
//         }
//     }
// }


// src/controllers/room.controller.js
import db from "../database/models/index.js"; // Sequelize models

export const getAllRooms = async (req, res) => {
    try {
        const rooms = await db.Room.findAll(); // lấy tất cả phòng
        res.json(rooms);
    } catch (error) {
        console.error("Lỗi lấy danh sách phòng:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};
