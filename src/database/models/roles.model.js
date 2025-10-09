import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
    class Role extends Model {
        static associate(models) {
            // Nếu có bảng role_user (nhiều-nhiều)
            Role.belongsToMany(models.User, {
                through: "role_user",
                foreignKey: "role_id",
                as: "users",
            });
        }
    }

    Role.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
        },
        { sequelize, modelName: "Role", tableName: "roles", timestamps: true }
    );

    return Role;
};
