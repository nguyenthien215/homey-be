import UserRepository from "../repositories/user.repository.js";

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async getListUsers() {
    try {
      return await this.repository.getAllUsers();
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  }
  async getUserById(id, includeRefreshToken) {
    try {
      return await this.repository.getUserById(id, includeRefreshToken);
    } catch (error) {
      throw new Error("Error fetching user: " + error.message);
    }
  }

  async createUser(userData) {
    try {
      return await this.repository.createUser(userData);
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }

  async updateUser(id, userData, updateRefreshToken = false) {
    try {
      return await this.repository.updateUser(id, userData, updateRefreshToken);
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  async deleteUser(id) {
    try {
      return await this.repository.deleteUser(id);
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }

  async getUserByEmail(email, withPassword = false) {
    try {
      return await this.repository.getUserByEmail(email, withPassword);
    } catch (error) {
      throw new Error("Error check user existed: " + error.message);
    }
  }
}

export default UserService;
