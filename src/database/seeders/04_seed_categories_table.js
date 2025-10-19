
import { v4 as uuidv4 } from "uuid";

export async function up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkDelete("categories", null, {});

    await queryInterface.bulkInsert(
        "categories",
        [
            {
                id: uuidv4(),
                name: "Hotel",
                image_url: JSON.stringify(["https://demo-be-hhq0.onrender.com/uploads/img/hotel.jpg"]),
                createdAt: now,
                updatedAt: now,
            },

            {
                id: uuidv4(),
                name: "Homestay",
                image_url: JSON.stringify(["https://demo-be-hhq0.onrender.com/uploads/img/homestay.jpg"]),

                createdAt: now,
                updatedAt: now,
            },
            {
                id: uuidv4(),
                name: "Resort",
                image_url: JSON.stringify(["https://demo-be-hhq0.onrender.com/uploads/img/resort.webp"]),

                createdAt: now,
                updatedAt: now,
            },
        ],
        {}
    );
}

export async function down(queryInterface) {
    await queryInterface.bulkDelete("categories", null, {});
}
