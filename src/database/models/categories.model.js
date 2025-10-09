import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Room, { foreignKey: "category_id", as: "rooms" });
        }
    }

    Category.init(
        {
            id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
            name: { type: DataTypes.STRING(100), allowNull: false },
        },
        { sequelize, modelName: "Category", tableName: "categories", timestamps: true }
    );

    return Category;
};
