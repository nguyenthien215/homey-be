import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
    class RoomDetail extends Model {
        static associate(models) {
            // Mỗi bản ghi chi tiết thuộc về 1 phòng
            RoomDetail.belongsTo(models.Room, {
                foreignKey: "room_id",
                as: "room", // ✅ alias phải là "room"
                onDelete: "CASCADE",
            });
        }
    }

    RoomDetail.init(
        {
            id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
            room_id: { type: DataTypes.UUID, allowNull: false },
            room_name: { type: DataTypes.STRING, allowNull: false },
            price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
            description: { type: DataTypes.TEXT, allowNull: false },
            images: { type: DataTypes.JSON, allowNull: true },
            rating: { type: DataTypes.FLOAT, defaultValue: 0 },
        },
        {
            sequelize,
            modelName: "RoomDetail",
            tableName: "room_details",
            timestamps: true,
        }
    );

    return RoomDetail;
};
