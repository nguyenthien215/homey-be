import RoomRepository from "../repositories/room.repository.js";

class RoomService {
    constructor() {
        this.repository = new RoomRepository();
    }

    async getAllRooms(req) {
        try {
            return await this.repository.getAllRooms(req);
        } catch (error) {
            throw new Error("Error fetching rooms: " + error.message);
        }
    }
    // async getCategoryById(id) {
    //   try {
    //     return await this.repository.getCategoryById(id);
    //   } catch (error) {
    //     throw new Error("Error fetching category: " + error.message);
    //   }
    // }

    // async createCategory(data) {
    //   try {
    //     return await this.repository.createCategory(data);
    //   } catch (error) {
    //     throw new Error("Error creating product: " + error.message);
    //   }
    // }

    // async editCategory(id, data) {
    //   try {
    //     return await this.repository.editCategory(id, data);
    //   } catch (error) {
    //     throw new Error("Error updating category: " + error.message);
    //   }
    // }

    // async deleteCategory(id) {
    //   try {
    //     return await this.repository.deleteCategory(id);
    //   } catch (error) {
    //     throw new Error("Error deleting category: " + error.message);
    //   }
    // }
}

export default RoomService;
