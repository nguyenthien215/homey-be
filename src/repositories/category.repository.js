// src/repositories/category.repository.js
import { Op } from "sequelize";
import db from "../database/models/index.js";

class CategoryRepository {
  constructor() {
    this.model = db.Category;
  }

  async getAllCategories(req) {
    try {
      const {
        page = 1,
        pageSize = 8,
        search = "",
        sortField = "createdAt",
        sortOrder = "DESC",
      } = req.query;

      const limit = Math.max(parseInt(pageSize, 10), 1);
      const offset = (Math.max(parseInt(page, 10), 1) - 1) * limit;

      const validSortFields = ["createdAt", "name"];
      const validSortOrders = ["ASC", "DESC"];
      const safeSortField = validSortFields.includes(sortField) ? sortField : "createdAt";
      const safeSortOrder = validSortOrders.includes(String(sortOrder).toUpperCase()) ? String(sortOrder).toUpperCase() : "DESC";

      const { count, rows } = await this.model.findAndCountAll({
        where: { name: { [Op.like]: `%${search}%` } },
        include: [
          { model: db.Room, as: "rooms", attributes: ["id", "name", "price", "image_url"] }
        ],
        order: [[safeSortField, safeSortOrder]],
        limit,
        offset,
      });

      // Parse image_url for categories too
      const data = rows.map(r => {
        const cat = r.toJSON ? r.toJSON() : r;
        if (cat.image_url && typeof cat.image_url === "string") {
          try { cat.image_url = JSON.parse(cat.image_url); } catch (e) { cat.image_url = [cat.image_url]; }
        }
        // also for rooms inside category
        if (Array.isArray(cat.rooms)) {
          cat.rooms = cat.rooms.map(room => {
            if (room.image_url && typeof room.image_url === "string") {
              try { room.image_url = JSON.parse(room.image_url); } catch (e) { room.image_url = [room.image_url]; }
            }
            return room;
          });
        }
        return cat;
      });

      return {
        data,
        pagination: {
          total: count,
          page: parseInt(page, 10),
          pageSize: limit,
          totalPages: Math.max(1, Math.ceil(count / limit)),
        },
      };
    } catch (error) {
      console.error("CategoryRepository Error:", error);
      throw new Error("Error fetching categories: " + (error.message || error));
    }
  }
}

export default CategoryRepository;
