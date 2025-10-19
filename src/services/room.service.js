// src/services/room.service.js
import RoomRepository from "../repositories/room.repository.js";

class RoomService {
    constructor() {
        this.roomRepository = new RoomRepository();
    }

    async getAllRooms(req) {
        return await this.roomRepository.getAllRooms(req);
    }

    async getRoomById(id) {
        return await this.roomRepository.getRoomById(id);
    }

    // ✅ THÊM HÀM NÀY (bắt buộc)
    async getRoomDetailById(id) {
        return await this.roomRepository.getRoomDetailById(id);
    }

    async getRoomsByCategory(categoryId) {
        throw new Error("getRoomsByCategory chưa được triển khai trong RoomRepository");
    }

    async createRoom(data) {
        return await this.roomRepository.createRoom(data);
    }

    async editRoom(id, data) {
        return await this.roomRepository.editRoom(id, data);
    }

    async deleteRoom(id) {
        return await this.roomRepository.deleteRoom(id);
    }
}

export default RoomService;
