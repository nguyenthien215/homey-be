// src/database/models/index.js
import AppConfig from "../../config/index.js";
import { Sequelize } from "sequelize";

// Import tất cả model
import userModel from "./users.model.js";
import categoryModel from "./categories.model.js";
import roleModel from "./roles.model.js";
import bookingModel from "./bookings.model.js";
import cityModel from "./cities.model.js";
import paymentModel from "./payments.model.js";
import reviewModel from "./reviews.model.js";
import roomPromotionModel from "./room_promotions.model.js";
import roomModel from "./rooms.model.js";
import promotionModel from "./promotions.model.js";
import roomDetailModel from "./room_detail.model.js";

// --- Khởi tạo Sequelize ---
const sequelize = new Sequelize(AppConfig.database.url, {
  dialect: AppConfig.database.dialect,
  pool: AppConfig.database.pool,
  logging: false, // tùy chọn: tắt log SQL cho gọn
});

// --- Khởi tạo models ---
const db = {
  sequelize,
  Sequelize,
  User: userModel(sequelize),
  Category: categoryModel(sequelize),
  Role: roleModel(sequelize),
  Payment: paymentModel(sequelize),
  Room: roomModel(sequelize),
  RoomDetail: roomDetailModel(sequelize),
  Promotion: promotionModel(sequelize),
  Review: reviewModel(sequelize),
  RoomPromotion: roomPromotionModel(sequelize),
  Booking: bookingModel(sequelize),
  City: cityModel(sequelize),
};

// --- Gọi associate sau khi define toàn bộ ---
Object.values(db).forEach((model) => {
  if (model?.associate) {
    model.associate(db);
  }
});

export default db;
