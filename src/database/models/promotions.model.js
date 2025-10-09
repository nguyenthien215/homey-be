import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
    class Promotion extends Model {
        static associate(models) {
            Promotion.belongsToMany(models.Room, {
                through: models.RoomPromotion,
                foreignKey: "promotion_id",
                as: "rooms",
            });
        }
    }

    Promotion.init(
        {
            id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
            code: { type: DataTypes.STRING(50), allowNull: false, unique: true },
            discount_type: { type: DataTypes.ENUM("percent", "fixed"), allowNull: false },
            discount_value: { type: DataTypes.FLOAT, allowNull: false },
            start_date: { type: DataTypes.DATE, allowNull: false },
            end_date: { type: DataTypes.DATE, allowNull: false },
            status: {
                type: DataTypes.ENUM("active", "inactive"),
                allowNull: false,
                defaultValue: "active",
            },
        },
        { sequelize, modelName: "Promotion", tableName: "promotions", timestamps: true }
    );

    return Promotion;
};
