import { v4 as uuidv4 } from "uuid";

export async function up(queryInterface) {
    const now = new Date();

    // Xóa hết dữ liệu cũ trước
    await queryInterface.bulkDelete("roles", null, {});

    await queryInterface.bulkInsert("roles", [
        { id: uuidv4(), name: "admin", createdAt: now, updatedAt: now },
        { id: uuidv4(), name: "room_owner", createdAt: now, updatedAt: now },
        { id: uuidv4(), name: "customer", createdAt: now, updatedAt: now },
    ], {});
}

export async function down(queryInterface) {
    await queryInterface.bulkDelete("roles", null, {});
}
