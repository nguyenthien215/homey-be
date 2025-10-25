import { Op, QueryTypes } from "sequelize";
import db from "../database/models/index.js";
import { v4 as uuidv4 } from "uuid";
import { getExpiresAtFromToken } from "../helpers/jwt.js";

class UserRepository {
  constructor() {
    this.model = db.User; // Initialize the User model
  }

  async getAllUsers(req) {
    try {
      const {
        page = 1,
        pageSize = 5,
        search = "",
        sortField = "createdAt",
        sortOrder = "DESC",
      } = req.query;

      const limit = Math.max(parseInt(pageSize), 1);
      const offset = (Math.max(parseInt(page), 1) - 1) * limit;

      // Đếm tổng số user thỏa điều kiện search
      const count = await this.model.count({
        where: {
          userName: {
            [Op.like]: `%${search}%`,
          },
        },
      });

      // Lấy danh sách user
      const rows = await db.sequelize.query(
        `
  SELECT 
    u.id,
    u.userName,
    u.email,
    u.phone,
    u.role_id,
    r.name AS roleName,
    u.createdAt,
    u.updatedAt
  FROM users u
  LEFT JOIN roles r ON u.role_id = r.id
  WHERE u.userName LIKE :search
  ORDER BY ${sortField} ${sortOrder}
  LIMIT ${limit} OFFSET ${offset}
  `,
        {
          replacements: { search: `%${search}%` },
          type: QueryTypes.SELECT,
        }
      );


      return {
        data: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          pageSize: limit,
          totalPages: Math.ceil(count / limit) || 1,
        },
      };
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  }

  async createUser(data) {
    try {
      const id = uuidv4(); // id user mới

      // Lấy roleId từ database
      const role = await db.Role.findOne({ where: { name: data.role } });
      if (!role) throw new Error(`Role "${data.role}" does not exist`);
      const roleId = role.id;

      const result = await db.sequelize.query(
        `INSERT INTO users (id, userName, email, password, phone, role_id, createdAt, updatedAt)
       VALUES (:id, :userName, :email, :password, :phone, :roleId, NOW(), NOW())`,
        {
          replacements: {
            id,
            userName: data.userName,
            email: data.email,
            password: data.password, // sau này hash bằng bcrypt
            phone: data.phone || null,
            roleId,
          },
          type: QueryTypes.INSERT,
        }
      );

      return {
        id,
        userName: data.userName,
        email: data.email,
        phone: data.phone || null,
        role_id: roleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
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



  async updateUser(id, data, updateRefreshToken = false) {
    const { refreshToken: token, ...userData } = data;
    try {
      const user = await this.getUserById(id, updateRefreshToken);
      if (!user) throw new Error("User not found");

      if (updateRefreshToken) {
        await this._updateOrCreateRefreshToken(user, token);
        return user;
      } else {
        const result = await db.sequelize.query(
          `UPDATE users
  SET userName=:userName, email=:email, password=:password, phone=:phone
  WHERE id=:id`,
          {
            replacements: {
              id,
              name: userData.name,
              email: userData.email,
              password: "",
              phone: userData.phone,
            },
            type: QueryTypes.UPDATE,
          }
        );
        return result;
      }
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  async deleteUser(id) {
    try {
      const user = await this.getUserById(id);
      if (!user) throw new Error("User not found");
      return await db.sequelize.query(`DELETE FROM users WHERE id=:id`, {
        replacements: {
          id,
        },
        type: QueryTypes.DELETE,
      });
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
