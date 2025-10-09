import { v4 as uuidv4 } from "uuid";

export async function up(queryInterface) {
    const now = new Date();

    const users = await queryInterface.sequelize.query(
        `SELECT id FROM users WHERE role_id != ''`,
        { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const rooms = await queryInterface.sequelize.query(
        `SELECT id FROM rooms`,
        { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert("reviews", [
        {
            id: uuidv4(),
            user_id: users[2].id,  // khách hàng
            room_id: rooms[0].id,
            rating: 5,
            comment: "Phòng rất đẹp, sạch sẽ và tiện nghi.",
            createdAt: now,
            updatedAt: now,
        },
    ], {});
}

export async function down(queryInterface) {
    await queryInterface.bulkDelete("reviews", null, {});
}
