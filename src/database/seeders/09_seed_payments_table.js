import { v4 as uuidv4 } from "uuid";

export async function up(queryInterface) {
    const now = new Date();

    // Lấy booking đã có
    const bookings = await queryInterface.sequelize.query(
        `SELECT id FROM bookings`,
        { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert("payments", [
        {
            id: uuidv4(),
            booking_id: bookings[0].id,
            method: "credit_card",   // có thể cash, momo, zalo_pay …
            amount: 100,             // trùng với total_price booking
            status: "paid",          // paid hoặc unpaid
            createdAt: now,
            updatedAt: now,
        },
    ], {});
}

export async function down(queryInterface) {
    await queryInterface.bulkDelete("payments", null, {});
}
