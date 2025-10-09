import AppConfig from "../../config/index.js";
import Sequelize from "sequelize";

import userModel from "./users.model.js";
// import profileModel from "./profile.model.js";
import categoryModel from "./categories.model.js";
import roleModel from "./roles.model.js";
import bookingModel from "./bookings.model.js";
import cityModel from "./cities.model.js";
import paymentModel from "./payments.model.js";
import reviewModel from "./reviews.model.js";
import room_promotionsModel from "./room_promotions.model.js";
import roomModel from "./rooms.model.js";
import promotionModel from "./promotions.model.js";


const sequelize = new Sequelize(AppConfig.database.url, {
  dialect: AppConfig.database.dialect, // ✅ Rất quan trọng!
  pool: AppConfig.database.pool,
});

const db = {
  sequelize,
  User: userModel(sequelize),
  Category: categoryModel(sequelize),
  Role: roleModel(sequelize),
  Payment: paymentModel(sequelize),
  Room: roomModel(sequelize),
  Promotion: promotionModel(sequelize),
  Review: reviewModel(sequelize),
  RoomPromotion: room_promotionsModel(sequelize),
  Booking: bookingModel(sequelize),
  City: cityModel(sequelize),
};

// Gọi associate cho tất cả models
Object.values(db).forEach((model) => {
  if (model?.associate) {
    model.associate(db);
  }
});

export default db;
