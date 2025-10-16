import BookingRepository from "../repositories/booking.repository.js";

class BookingService {
    constructor() {
        this.repository = new BookingRepository();
    }

    async getAllBookings(req) {
        try {
            return await this.repository.getAllBookings(req);
        } catch (error) {
            throw new Error("Error fetching bookings: " + error.message);
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

export default BookingService;
