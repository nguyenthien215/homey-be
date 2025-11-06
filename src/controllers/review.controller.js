import ReviewService from "../services/review.service.js";
import BaseController from "./base.controller.js";

class ReviewController extends BaseController {
    constructor() {
        super();
        this.service = new ReviewService();
    }

    async getAllReviews(req, res) {
        try {
            const reviews = await this.service.getAllReviews(req);
            res.json(reviews);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getReviewById(req, res) {
        try {
            const { id } = req.params;
            const review = await this.service.getReviewById(id);
            res.json(review);
        } catch (error) {
            console.error("❌ Error fetching Review:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async createReviews(req, res) {
        try {
            const data = req.body;
            await this.service.createReviews(data);
            return res.status(200).json({ status: true });
        } catch (error) {
            console.error("Error creating Reviews:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async updateReviews(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            await this.service.updateReviews(id, data);
            return res.status(200).json({ status: true });
        } catch (error) {
            console.error("Error creating Reviews:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async deleteReviews(req, res) {
        try {
            const { id } = req.params;
            await this.service.deleteReviews(id);
            return res.status(200).json({ status: true });
        } catch (error) {
            console.error("Error dalete review:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // Thêm vào trong class ReviewController (trước export)
    async getReviewsByRoom(req, res) {
        try {
            const { roomId } = req.params;
            const reviews = await this.service.getReviewsByRoom(roomId);
            return res.status(200).json(reviews);
        } catch (error) {
            console.error("Error fetching reviews by room:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async createUserReview(req, res) {
        try {
            const { room_id, rating, comment, user_id } = req.body;
            if (!room_id || !user_id || !rating)
                return res.status(400).json({ error: "Thiếu dữ liệu đánh giá!" });

            const newReview = await this.service.createReviews({
                room_id,
                user_id,
                rating,
                comment,
            });

            return res.status(201).json(newReview);
        } catch (error) {
            console.error("Error creating user review:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

}

export default ReviewController;