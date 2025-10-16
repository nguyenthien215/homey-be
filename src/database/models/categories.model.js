// src/database/models/categories.model.js
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
            // image_url là JSON (mảng đường dẫn) theo migration bạn seed
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
        // match tên foreign key trong bảng rooms (category_id)
        Category.hasMany(db.Room, {
            foreignKey: "category_id",
            as: "rooms",
        });
    };

    return Category;
};
