import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
    class Booking extends Model {
        static associate(models) {
            Booking.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
            Booking.belongsTo(models.Room, { foreignKey: "room_id", as: "room" });
            Booking.hasOne(models.Payment, { foreignKey: "booking_id", as: "payment" });
        }
    }

    Booking.init(
        {
            id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
            start_date: { type: DataTypes.DATE, allowNull: false },
            end_date: { type: DataTypes.DATE, allowNull: false },
            quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
            total_price: { type: DataTypes.FLOAT, allowNull: false },
            status: {
                type: DataTypes.ENUM("pending", "confirmed", "cancelled", "completed"),
                allowNull: false,
                defaultValue: "pending",
            },
        },
        { sequelize, modelName: "Booking", tableName: "bookings", timestamps: true }
    );

    return Booking;
};
