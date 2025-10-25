// src/database/models/city.model.js
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
    class City extends Model {
        static associate(models) {
            // Một thành phố có nhiều phòng
            City.hasMany(models.Room, {
                foreignKey: "city_id",
                as: "rooms",
                onDelete: "CASCADE"
            });
        }
    }

    City.init(
        {
            id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
            name: { type: DataTypes.STRING(100), allowNull: false },
        },
        { sequelize, modelName: "City", tableName: "cities", timestamps: true }
    );

    return City;
};
