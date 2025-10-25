import UserService from "../services/user.service.js";
import BaseController from "./base.controller.js";

class UserController extends BaseController {
  constructor() {
    super();
    this.service = new UserService();
  }

  async getAllUsers(req, res) {
    try {
      const users = await this.service.getAllUsers(req);
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createUser(req, res) {
    try {
      const userData = req.body;

      // Kiểm tra dữ liệu đầu vào tối thiểu
      if (!userData.userName || !userData.email || !userData.password || !userData.role) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const user = await this.service.createUser(userData);
      return res.status(201).json({ status: true, data: user });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }


  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const userData = req.body;
      await this.service.updateUser(id, userData);
      return res.status(200).json({ status: true });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await this.service.deleteUser(id);
      return res.status(200).json({ status: true });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default UserController;
