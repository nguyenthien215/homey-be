import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
    class City extends Model {
        static associate(models) {
            City.hasMany(models.Room, { foreignKey: "city_id", as: "rooms" });
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
