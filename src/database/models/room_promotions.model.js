import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
    class RoomPromotion extends Model {
        static associate() { }
    }

    RoomPromotion.init(
        {
            id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
            room_id: { type: DataTypes.UUID, allowNull: false },
            promotion_id: { type: DataTypes.UUID, allowNull: false },
        },
        { sequelize, modelName: "RoomPromotion", tableName: "room_promotions", timestamps: true }
    );

    return RoomPromotion;
};
