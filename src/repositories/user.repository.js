import { Op, QueryTypes } from "sequelize";
import db from "../database/models/index.js";
import { v4 as uuidv4 } from "uuid";
import { getExpiresAtFromToken } from "../helpers/jwt.js";
import bcrypt from "bcrypt";

class UserRepository {
  constructor() {
    this.model = db.User; // Initialize the User model
  }

  async getAllUsers() {
    try {
      const users = await db.sequelize.query(
        `SELECT 
          u.id,
          u.userName,
          u.email,
          u.phone,
          u.createdAt,
          u.updatedAt,
          u.role_id,
          r.name AS roleName
       FROM users u
       LEFT JOIN roles r ON u.role_id = r.id
       ORDER BY u.createdAt DESC`,
        { type: QueryTypes.SELECT }
      );
      return users;
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  }



  async getUserById(id, includeRefreshToken = false) {
    try {
      return await (includeRefreshToken
        ? this.model.findByPk(id, { include: db.RefreshToken })
        : db.sequelize.query("SELECT * from users WHERE id = $id", {
          bind: { id },
          type: QueryTypes.SELECT,
        }));
    } catch (error) {
      throw new Error("Error fetching user: " + error.message);
    }
  }

  async createUser(userData) {
    try {
      const id = uuidv4();

      // 🔍 Tìm role nếu chỉ có role_name
      let roleId = userData.role_id;
      if (!roleId && userData.role_name) {
        const [role] = await db.sequelize.query(
          `SELECT id FROM roles WHERE name = :name`,
          {
            replacements: { name: userData.role_name },
            type: QueryTypes.SELECT,
          }
        );
        if (!role) throw new Error("Role không tồn tại!");
        roleId = role.id;
      }

      // ✅ Hash mật khẩu trước khi lưu
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // ✅ Lưu user
      await db.sequelize.query(
        `INSERT INTO users (id, userName, email, password, phone, role_id, createdAt, updatedAt)
         VALUES (:id, :userName, :email, :password, :phone, :role_id, NOW(), NOW())`,
        {
          replacements: {
            id,
            userName: userData.userName,
            email: userData.email,
            password: hashedPassword, // <-- Đã hash
            phone: userData.phone || null,
            role_id: roleId,
          },
          type: QueryTypes.INSERT,
        }
      );

      return { success: true, message: "User created successfully" };
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }




  async updateUser(id, data) {
    try {
      const user = await this.model.findByPk(id); // hoặc this.getUserById(id)
      if (!user) throw new Error("User not found");

      return await user.update({
        userName: data.userName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role_id: data.role_id,
      });
    } catch (error) {
      if (error.message.includes("duplicate key")) {
        throw new Error("Email đã tồn tại!");
      }
      throw new Error("Error updating user: " + error.message);
    }
  }


  async deleteUser(id) {
    try {
      const user = await this.model.findByPk(id); // lấy instance model trực tiếp
      if (!user) throw new Error("User not found");

      await user.destroy(); // xóa user
      return { success: true, message: "User deleted successfully" };
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }

  //   async getUserByEmail(email, withPassword = false) {
  //     try {
  //       const user = withPassword
  //         ? await this.model.scope("withPassword").findOne({
  //             where: {
  //               email,
  //             },
  //           })
  //         : await this.model.findOne({
  //             where: {
  //               email,
  //             },
  //           });
  //       return user;
  //     } catch (error) {
  //       throw new Error("Error check user existed: " + error.message);
  //     }
  //   }

  //   async _updateOrCreateRefreshToken(user, token) {
  //     try {
  //       // Get expiresAt from JWT
  //       const expiresAt = getExpiresAtFromToken(token);

  //       if (user.RefreshToken) {
  //         await user.RefreshToken.update({
  //           userId: user.id,
  //           token,
  //           expiresAt,
  //         });
  //       } else {
  //         await user.createRefreshToken({ token, expiresAt });
  //       }
  //     } catch (error) {
  //       throw new Error("Error check user existed: " + error.message);
  //     }
  //   }
}

export default UserRepository;
