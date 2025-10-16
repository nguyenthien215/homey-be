// src/database/models/rooms.model.js
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
    class Room extends Model {
        static associate(models) {
            Room.belongsTo(models.City, { foreignKey: "city_id", as: "city" });
            Room.belongsTo(models.User, { foreignKey: "user_id", as: "owner" });
            Room.belongsTo(models.Category, { foreignKey: "category_id", as: "category" });

            Room.hasMany(models.Booking, { foreignKey: "room_id", as: "bookings" });
            Room.hasMany(models.Review, { foreignKey: "room_id", as: "reviews" });

            Room.belongsToMany(models.Promotion, {
                through: models.RoomPromotion,
                foreignKey: "room_id",
                as: "promotions",
            });

            Room.hasOne(models.RoomDetail, {
                foreignKey: "room_id",
                as: "detail",
                onDelete: "CASCADE",
            });
        }
    }

    Room.init(
        {
            id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
            name: { type: DataTypes.STRING(100), allowNull: false },
            description: { type: DataTypes.STRING(255), allowNull: false },
            price: { type: DataTypes.FLOAT, allowNull: false },
            stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
            image_url: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },


            // thêm field category_id để ánh xạ FK tới categories.id (UUID)
            category_id: {
                type: DataTypes.UUID,
                allowNull: true, // hoặc false nếu bạn bắt buộc phải có category
                references: {
                    model: "categories",
                    key: "id",
                },
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
            },
        },
        { sequelize, modelName: "Room", tableName: "rooms", timestamps: true }
    );

    return Room;
};
