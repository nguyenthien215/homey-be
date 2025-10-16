import CategoryService from "../services/category.service.js";
const categoryService = new CategoryService();

class CategoryController {
  async getAllCategories(req, res) {
    try {
      const categories = await categoryService.getAllCategories(req);
      res.status(200).json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Error fetching categories" });
    }
  }
}

export default new CategoryController();
