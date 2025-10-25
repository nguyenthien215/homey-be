// src/controllers/room.controller.js
import RoomService from "../services/room.service.js";

class RoomController {
    constructor() {
        this.roomService = new RoomService();
    }


    getAllRooms = async (req, res) => {
        try {
            const rooms = await this.roomService.getAllRooms(req);
            res.status(200).json({ success: true, data: rooms });
        } catch (error) {
            console.error("❌ Lỗi khi lấy danh sách phòng:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    };


    getRoomById = async (req, res) => {
        try {
            const { id } = req.params;
            const room = await this.roomService.getRoomById(id);
            if (!room)
                return res.status(404).json({ success: false, message: "Không tìm thấy phòng" });
            res.status(200).json({ success: true, data: room });
        } catch (error) {
            console.error("❌ Lỗi khi lấy phòng theo ID:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    };

    //  Lấy chi tiết phòng theo room_id (trang RoomDetailPage.tsx gọi API này)
    getRoomDetailById = async (req, res) => {
        try {
            const { id } = req.params;
            const detail = await this.roomService.getRoomDetailById(id);
            if (!detail)
                return res.status(404).json({ success: false, message: "Không tìm thấy chi tiết phòng" });
            res.status(200).json({ success: true, data: detail });
        } catch (error) {
            console.error("❌ Lỗi khi lấy chi tiết phòng:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    };


    getRoomsByCategory = async (req, res) => {
        try {
            const { categoryId } = req.params;
            const rooms = await this.roomService.getRoomsByCategory(categoryId);
            res.status(200).json({ success: true, data: rooms });
        } catch (error) {
            console.error("❌ Lỗi khi lấy phòng theo danh mục:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    };

    createRoom = async (req, res) => {
        try {
            const roomData = {
                ...req.body,
                user_id: req.user.id // lấy từ token
            };

            const newRoom = await this.roomRepository.createRoom(roomData);
            res.status(201).json({ success: true, data: newRoom });
        } catch (error) {
            console.error("❌ Lỗi khi tạo phòng:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    };

    editRoom = async (req, res) => {
        try {
            const { id } = req.params;
            const updatedRoom = await this.roomService.editRoom(id, req.body);
            res.status(200).json({ success: true, data: updatedRoom });
        } catch (error) {
            console.error("❌ Lỗi khi cập nhật phòng:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    };

    deleteRoom = async (req, res) => {
        try {
            const { id } = req.params;
            const deletedRoom = await this.roomService.deleteRoom(id);
            res.status(200).json({ success: true, data: deletedRoom });
        } catch (error) {
            console.error("❌ Lỗi khi xóa phòng:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    };
}

export default RoomController;
