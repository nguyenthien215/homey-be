export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("room_promotions", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    room_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "rooms",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      primaryKey: true, // composite PK
    },
    promotion_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "promotions",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      primaryKey: true, // composite PK
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
  await queryInterface.dropTable("room_promotions");
}
