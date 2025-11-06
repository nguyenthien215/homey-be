import { v4 as uuidv4 } from "uuid";

export async function up(queryInterface) {
  const now = new Date();

  const rooms = await queryInterface.sequelize.query(
    `SELECT id FROM rooms`,
    { type: queryInterface.sequelize.QueryTypes.SELECT }
  );
  const promotions = await queryInterface.sequelize.query(
    `SELECT id FROM promotions`,
    { type: queryInterface.sequelize.QueryTypes.SELECT }
  );

  await queryInterface.bulkInsert("room_promotions", [
    {
      id: uuidv4(),
      room_id: rooms[0].id,
      promotion_id: promotions[0].id,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: uuidv4(),
      room_id: rooms[1].id,
      promotion_id: promotions[1].id,
      createdAt: now,
      updatedAt: now,
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("room_promotions", null, {});
}