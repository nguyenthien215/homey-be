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

    await queryInterface.bulkInsert("bookings", [
        {
            id: uuidv4(),
            user_id: users[2].id,  // khách hàng
            room_id: rooms[0].id,
            start_date: now,
            end_date: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 ngày sau
            quantity: 1,
            total_price: 100,
            status: "confirmed",
            createdAt: now,
            updatedAt: now,
        },
    ], {});
}

export async function down(queryInterface) {
    await queryInterface.bulkDelete("bookings", null, {});
}
