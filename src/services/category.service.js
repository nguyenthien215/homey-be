import CategoryRepository from "../repositories/category.repository.js";

class CategoryService {
  constructor() {
    this.repository = new CategoryRepository();
  }

  async getAllCategories(req) {
    try {
      return await this.repository.getAllCategories(req);
    } catch (error) {
      throw new Error("Error fetching categories: " + error.message);
    }
  }
  async getCategoryById(id) {
    try {
      return await this.repository.getCategoryById(id);
    } catch (error) {
      throw new Error("Error fetching category: " + error.message);
    }
  }

  async createCategory(data) {
    try {
      return await this.repository.createCategory(data);
    } catch (error) {
      throw new Error("Error creating product: " + error.message);
    }
  }

  async editCategory(id, data) {
    try {
      return await this.repository.editCategory(id, data);
    } catch (error) {
      throw new Error("Error updating category: " + error.message);
    }
  }

  async deleteCategory(id) {
    try {
      return await this.repository.deleteCategory(id);
    } catch (error) {
      throw new Error("Error deleting category: " + error.message);
    }
  }
}

export default CategoryService;
