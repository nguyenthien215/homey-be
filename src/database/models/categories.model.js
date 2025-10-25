import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Category = sequelize.define(
        "Category",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            image_url: {
                type: DataTypes.JSON,
                allowNull: false,
                defaultValue: [],
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            tableName: "categories",
            timestamps: true,
        }
    );

    Category.associate = (db) => {
        // ✅ Đảm bảo alias và foreign key đồng bộ với Room
        Category.hasMany(db.Room, {
            foreignKey: "category_id",
            as: "rooms",
        });
    };

    return Category;
};
