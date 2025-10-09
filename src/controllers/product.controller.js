import ProductService from "../services/product.service.js";
import BaseController from "./base.controller.js";

class ProductController extends BaseController {
  constructor() {
    super();
    this.service = new ProductService();
  }

  async getListProducts(req, res) {
    try {
      const products = await this.service.getListProducts(req);
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await this.service.getProductById(id);
      res.json(product);
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createProduct(req, res) {
    try {
      const productData = req.body;
      await this.service.createProduct(productData);
      return res.status(200).json({ status: true });
    } catch (error) {
      console.error("Error creating product:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const productData = req.body;
      await this.service.updateProduct(id, productData);
      return res.status(200).json({ status: true });
    } catch (error) {
      console.error("Error creating product:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      await this.service.deleteProduct(id);
      return res.status(200).json({ status: true });
    } catch (error) {
      console.error("Error creating product:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default ProductController;
