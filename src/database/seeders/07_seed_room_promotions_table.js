import { v4 as uuidv4 } from "uuid";

export async function up(queryInterface) {
  const now = new Date();

  // Lấy rooms và promotions đã có
  const rooms = await queryInterface.sequelize.query(
    `SELECT id FROM rooms`,
    { type: queryInterface.sequelize.QueryTypes.SELECT }
  );
  const promotions = await queryInterface.sequelize.query(
    `SELECT id FROM promotions`,
    { type: queryInterface.sequelize.QueryTypes.SELECT }
  );

  // Seed các bản ghi vào room_promotions
  await queryInterface.bulkInsert("room_promotions", [
    {
      room_id: rooms[0].id,
      promotion_id: promotions[0].id,
      createdAt: now,
      updatedAt: now,
    },
    {
      room_id: rooms[1].id,
      promotion_id: promotions[1].id,
      createdAt: now,
      updatedAt: now,
    },
  ], {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("room_promotions", null, {});
}
