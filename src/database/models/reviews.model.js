import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
    class Review extends Model {
        static associate(models) {
            Review.belongsTo(models.Room, { foreignKey: "room_id", as: "room" });
            Review.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
        }
    }

    Review.init(
        {
            id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
            rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
            comment: { type: DataTypes.STRING(255), allowNull: true },
        },
        { sequelize, modelName: "Review", tableName: "reviews", timestamps: true }
    );

    return Review;
};
