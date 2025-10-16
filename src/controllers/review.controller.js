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

    // async getCategoryById(req, res) {
    //   try {
    //     const { id } = req.params;
    //     const category = await this.service.getCategoryById(id);
    //     res.json(category);
    //   } catch (error) {
    //     console.error("Error fetching category:", error);
    //     return res.status(500).json({ error: "Internal Server Error" });
    //   }
    // }

    // async createCategory(req, res) {
    //   try {
    //     const data = req.body;
    //     await this.service.createCategory(data);
    //     return res.status(200).json({ status: true });
    //   } catch (error) {
    //     console.error("Error creating category:", error);
    //     return res.status(500).json({ error: "Internal Server Error" });
    //   }
    // }

    // async editCategory(req, res) {
    //   try {
    //     const { id } = req.params;
    //     const data = req.body;
    //     await this.service.editCategory(id, data);
    //     return res.status(200).json({ status: true });
    //   } catch (error) {
    //     console.error("Error creating category:", error);
    //     return res.status(500).json({ error: "Internal Server Error" });
    //   }
    // }

    // async deleteCategory(req, res) {
    //   try {
    //     const { id } = req.params;
    //     await this.service.deleteCategory(id);
    //     return res.status(200).json({ status: true });
    //   } catch (error) {
    //     console.error("Error dalete category:", error);
    //     return res.status(500).json({ error: "Internal Server Error" });
    //   }
    // }
}

export default ReviewController;
