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

    async getRoomDetailById(id) {
        return await this.roomRepository.getRoomDetailById(id);
    }

    async getRoomsByCategory(categoryId) {
        return await this.roomRepository.getRoomsByCategory(categoryId);
    }

    async createRoom(roomData) {
        try {
            return await this.roomRepository.createRoom(roomData);
        } catch (error) {
            throw new Error("Error creating room: " + error.message);
        }
    }
    async updateRoom(id, data) {
        return await this.roomRepository.updateRoom(id, data);
    }

    async deleteRoom(id) {
        return await this.roomRepository.deleteRoom(id);
    }
}

export default RoomService;
