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
      res.status(200).json(categories);
    } catch (error) {
      console.error("❌ Error fetching categories:", error);
      res.status(500).json({ message: "Error fetching categories" });
    }
  }

  async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await this.service.getCategoryById(id);
      res.json(category);
    } catch (error) {
      console.error("❌ Error fetching category:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createCategory(req, res) {
    try {
      const data = req.body;

      // Nếu có file upload, xử lý upload ảnh
      if (req.files && req.files.length > 0) {
        data.image_url = req.files.map(file => `/uploads/img/${file.filename}`);
      }

      const newCategory = await this.service.createCategory(data);
      res.status(201).json({
        message: "Tạo danh mục thành công",
        data: newCategory,
      });
    } catch (error) {
      console.error("❌ CategoryController.createCategory:", error);
      res.status(500).json({ message: error.message });
    }
  }

  async editCategory(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      // Nếu có file upload, xử lý upload ảnh
      if (req.files && req.files.length > 0) {
        data.image_url = req.files.map(file => `/uploads/img/${file.filename}`);
      }

      await this.service.editCategory(id, data);
      return res.status(200).json({ status: true });
    } catch (error) {
      console.error("❌ Error editing category:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      await this.service.deleteCategory(id);
      return res.status(200).json({ status: true });
    } catch (error) {
      console.error("❌ Error deleting category:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default CategoryController;