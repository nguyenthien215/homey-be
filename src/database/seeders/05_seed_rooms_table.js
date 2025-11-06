import { v4 as uuidv4 } from "uuid";

export async function up(queryInterface) {
  const now = new Date();

  // Giả sử đã biết user_id của chủ phòng, city_id, category_id
  const users = await queryInterface.sequelize.query(
    `SELECT id FROM users WHERE role_id != ''`,
    { type: queryInterface.sequelize.QueryTypes.SELECT }
  );
  const cities = await queryInterface.sequelize.query(
    `SELECT id FROM cities`,
    { type: queryInterface.sequelize.QueryTypes.SELECT }
  );
  const categories = await queryInterface.sequelize.query(
    `SELECT id FROM categories`,
    { type: queryInterface.sequelize.QueryTypes.SELECT }
  );

  await queryInterface.bulkInsert("rooms", [
    {
      id: uuidv4(),
      name: "Phòng Deluxe",
      description: "Phòng Deluxe rộng rãi, có ban công",
      price: 1900000,
      stock: 5,
      image_url: JSON.stringify(["https://demo-be-hhq0.onrender.com/uploads/img/phong-1.jpg"]),
      city_id: cities[0].id,
      user_id: users[0].id,
      category_id: categories[0].id,
      createdAt: now,
      updatedAt: now,
    },

    {
      id: uuidv4(),
      name: "Phòng VIP",
      description: "Phòng VIP sang trọng, có phòng tắm riêng cao cấp",
      price: 2000000,
      stock: 10,
      image_url: JSON.stringify(["https://demo-be-hhq0.onrender.com/uploads/img/phong-2.jpg"]),
      city_id: cities[1].id,
      user_id: users[1].id,
      category_id: categories[0].id,
      createdAt: now,
      updatedAt: now,
    },

    {
      id: uuidv4(),
      name: "Phòng Superior",
      description: "Phòng Superior thoáng mát, có cửa sổ lớn, giường đôi",
      price: 1800000,
      stock: 10,
      image_url: JSON.stringify(["https://demo-be-hhq0.onrender.com/uploads/img/phong-3.png"]),
      city_id: cities[1].id,
      user_id: users[1].id,
      category_id: categories[0].id,
      createdAt: now,
      updatedAt: now,
    },

    {
      id: uuidv4(),
      name: "Phòng Standard",
      description: "Phòng Standard đơn giản, sạch sẽ",
      price: 1500000,
      stock: 10,
      image_url: JSON.stringify(["https://demo-be-hhq0.onrender.com/uploads/img/phong-4.jpg"]),
      city_id: cities[1].id,
      user_id: users[1].id,
      category_id: categories[2].id,
      createdAt: now,
      updatedAt: now,
    },

    {
      id: uuidv4(),
      name: "Phòng Single",
      description: "Phòng Single nhỏ gọn, dành cho 1 người, view núi",
      price: 1300000,
      stock: 10,
      image_url: JSON.stringify(["https://demo-be-hhq0.onrender.com/uploads/img/phong-6.jpg"]),
      city_id: cities[1].id,
      user_id: users[1].id,
      category_id: categories[1].id,
      createdAt: now,
      updatedAt: now,
    },


    {
      id: uuidv4(),
      name: "Phòng Gia Đình",
      description: "Phù hợp đi với gia đình",
      price: 1000000,
      stock: 10,
      image_url: JSON.stringify(["https://demo-be-hhq0.onrender.com/uploads/img/phong-5.jpg"]),
      city_id: cities[1].id,
      user_id: users[1].id,
      category_id: categories[0].id,
      createdAt: now,
      updatedAt: now,
    },



  ], {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("rooms", null, {});
}