import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
    class Payment extends Model {
        static associate(models) {
            Payment.belongsTo(models.Booking, { foreignKey: "booking_id", as: "booking" });
        }
    }

    Payment.init(
        {
            id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
            method: {
                type: DataTypes.ENUM("cash", "credit_card", "momo", "zalo_pay"),
                allowNull: false,
            },
            amount: { type: DataTypes.FLOAT, allowNull: false },
            status: {
                type: DataTypes.ENUM("paid", "unpaid"),
                allowNull: false,
                defaultValue: "unpaid",
            },
        },
        { sequelize, modelName: "Payment", tableName: "payments", timestamps: true }
    );

    return Payment;
};
