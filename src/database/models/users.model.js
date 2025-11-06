// models/user.js
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
    class User extends Model {
        static associate(models) {
            // User thuộc về 1 Role
            User.belongsTo(models.Role, {
                foreignKey: "role_id",
                as: "role",
            });
            // User có nhiều Booking
            User.hasMany(models.Booking, { foreignKey: "user_id", as: "bookings" });
            User.hasMany(models.Room, {
                foreignKey: "user_id",
                as: "rooms",
            });
        }
    }

    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            userName: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(150),
                allowNull: false,
                unique: true,
            },
            phone: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "User",
            tableName: "users",
            timestamps: true, // Sequelize sẽ tự tạo createdAt & updatedAt
        }
    );

    return User;
};