export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("payments", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    booking_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "bookings",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      unique: true, // 1 booking chỉ có 1 payment
    },
    method: {
      type: Sequelize.ENUM("cash", "credit_card", "momo", "zalo_pay"),
      allowNull: false,
    },
    amount: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("paid", "unpaid"),
      allowNull: false,
      defaultValue: "unpaid",
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("payments");
}
