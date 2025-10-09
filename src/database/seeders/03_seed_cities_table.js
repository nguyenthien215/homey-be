import { v4 as uuidv4 } from "uuid";

export async function up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert("cities", [
        {
            id: uuidv4(),
            name: "Hà Nội",
            createdAt: now,
            updatedAt: now,
        },
        {
            id: uuidv4(),
            name: "Đà Nẵng",
            createdAt: now,
            updatedAt: now,
        },
        {
            id: uuidv4(),
            name: "TP. Hồ Chí Minh",
            createdAt: now,
            updatedAt: now,
        },
        {
            id: uuidv4(),
            name: "Hải Phòng",
            createdAt: now,
            updatedAt: now,
        },
        {
            id: uuidv4(),
            name: "Cần Thơ",
            createdAt: now,
            updatedAt: now,
        },
    ], {});
}

export async function down(queryInterface) {
    await queryInterface.bulkDelete("cities", null, {});
}
