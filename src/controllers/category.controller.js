import CategoryService from "../services/category.service.js";
import BaseController from "./base.controller.js";

class CategoryController extends BaseController {
  constructor() {
    super();
    this.service = new CategoryService();
  }

  async getAllCategories(req, res) {
    try {
      const categories = await this.service.getAllCategories(req);
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await this.service.getCategoryById(id);
      res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createCategory(req, res) {
    try {
      const data = req.body;
      await this.service.createCategory(data);
      return res.status(200).json({ status: true });
    } catch (error) {
      console.error("Error creating category:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async editCategory(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      await this.service.editCategory(id, data);
      return res.status(200).json({ status: true });
    } catch (error) {
      console.error("Error creating category:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      await this.service.deleteCategory(id);
      return res.status(200).json({ status: true });
    } catch (error) {
      console.error("Error dalete category:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default CategoryController;
