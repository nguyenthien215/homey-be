import { v4 as uuidv4 } from "uuid";

export async function up(queryInterface) {
    const now = new Date();

    // Xóa dữ liệu cũ
    await queryInterface.bulkDelete("categories", null, {});

    await queryInterface.bulkInsert("categories", [
        { id: uuidv4(), name: "hotel", createdAt: now, updatedAt: now },
        { id: uuidv4(), name: "homestay", createdAt: now, updatedAt: now },
        { id: uuidv4(), name: "resort", createdAt: now, updatedAt: now },
    ], {});
}

export async function down(queryInterface) {
    await queryInterface.bulkDelete("categories", null, {});
}
