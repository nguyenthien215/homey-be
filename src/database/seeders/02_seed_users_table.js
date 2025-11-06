import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

export async function up(queryInterface, Sequelize) {
  const now = new Date();

  // Lấy UUID thật từ bảng roles
  const rolesFromDB = await queryInterface.sequelize.query(
    `SELECT id, name FROM roles`,
    { type: queryInterface.sequelize.QueryTypes.SELECT }
  );

  const roles = {
    admin: rolesFromDB.find(r => r.name === "admin").id,
    room_owner: rolesFromDB.find(r => r.name === "room_owner").id,
    customer: rolesFromDB.find(r => r.name === "customer").id
  };

  await queryInterface.bulkInsert("users", [
    {
      id: uuidv4(),
      userName: "adminUser",
      password: bcrypt.hashSync("admin123", 10),
      email: "admin@example.com",
      phone: "0123456789",
      role_id: roles.admin,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: uuidv4(),
      userName: "nhat",
      password: bcrypt.hashSync("111111", 10),
      email: "nhat@gmail.com",
      phone: "0123456789",
      role_id: roles.admin,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: uuidv4(),
      userName: "ownerUser",
      password: bcrypt.hashSync("owner123", 10),
      email: "owner@example.com",
      phone: "0987654321",
      role_id: roles.room_owner,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: uuidv4(),
      userName: "customerUser",
      password: bcrypt.hashSync("customer123", 10),
      email: "customer@example.com",
      phone: "0112233445",
      role_id: roles.customer,
      createdAt: now,
      updatedAt: now,
    },
  ], {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("users", null, {});
}
