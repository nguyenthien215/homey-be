import ReviewRepository from "../repositories/review.repository.js";

class ReviewService {
    constructor() {
        this.repository = new ReviewRepository();
    }

    async getAllReviews(req) {
        try {
            return await this.repository.getAllReviews(req);
        } catch (error) {
            throw new Error("Error fetching reviews: " + error.message);
        }
    }
    async getReviewById(id) {
        try {
            return await this.repository.getReviewById(id);
        } catch (error) {
            throw new Error("Error fetching review: " + error.message);
        }
    }

    async createReviews(data) {
        try {
            return await this.repository.createReviews(data);
        } catch (error) {
            throw new Error("Error creating Reviews: " + error.message);
        }
    }

    async updateReviews(id, data) {
        try {
            return await this.repository.updateReviews(id, data);
        } catch (error) {
            throw new Error("Error updating Reviews: " + error.message);
        }
    }

    async deleteReviews(id) {
        try {
            return await this.repository.deleteReviews(id);
        } catch (error) {
            throw new Error("Error deleting Reviews: " + error.message);
        }
    }

    async getReviewsByRoom(roomId) {
        try {
            return await this.repository.getReviewsByRoom(roomId);
        } catch (error) {
            throw new Error("Error fetching reviews by room: " + error.message);
        }
    }

}

export default ReviewService;