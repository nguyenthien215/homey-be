import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
    class Room extends Model {
        static associate(models) {
            // Một phòng có một bản ghi chi tiết
            Room.hasOne(models.RoomDetail, {
                foreignKey: "room_id",
                as: "room_detail",
                onDelete: "CASCADE",
            });

            // Một phòng thuộc về 1 danh mục
            Room.belongsTo(models.Category, {
                foreignKey: "category_id",
                as: "category",
            });

            // Một phòng thuộc về 1 thành phố
            Room.belongsTo(models.City, {
                foreignKey: "city_id",
                as: "city",
            });
        }
    }

    Room.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: { type: DataTypes.STRING(100), allowNull: false },
            description: { type: DataTypes.STRING(255), allowNull: false },
            price: { type: DataTypes.FLOAT, allowNull: false },
            image_url: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
            category_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: { model: "categories", key: "id" },
            },
            city_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: { model: "cities", key: "id" },
            },
        },
        {
            sequelize,
            modelName: "Room",
            tableName: "rooms",
            timestamps: true,
        }
    );

    return Room;
};
