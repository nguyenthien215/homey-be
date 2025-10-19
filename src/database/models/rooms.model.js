
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
    class Room extends Model {
        static associate(models) {
            // Một phòng có 1 chi tiết phòng
            Room.hasOne(models.RoomDetail, {
                foreignKey: "room_id",
                as: "detail", // alias dùng khi include trong repository
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
            image_url: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
        },
        { sequelize, modelName: "Room", tableName: "rooms", timestamps: true }
    );

    return Room;
};
