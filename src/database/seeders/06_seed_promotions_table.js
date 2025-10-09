import { v4 as uuidv4 } from "uuid";

export async function up(queryInterface) {
  const now = new Date();

  await queryInterface.bulkDelete("promotions", null, {});

  await queryInterface.bulkInsert("promotions", [
    {
      id: uuidv4(),
      code: "SAVE20",
      discount_type: "percent",
      discount_value: 20,
      start_date: new Date(),
      end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      status: "active",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: uuidv4(),
      code: "NEWUSER",
      discount_type: "fixed",
      discount_value: 100000,
      start_date: new Date(),
      end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      status: "active",
      createdAt: now,
      updatedAt: now,
    },
  ], {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("promotions", null, {});
}
