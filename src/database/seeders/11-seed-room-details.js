'use strict';

import { randomUUID } from 'crypto';

export default {
    async up(queryInterface, Sequelize) {
        // Lấy id của phòng đầu tiên
        const [rooms] = await queryInterface.sequelize.query(`SELECT id FROM rooms LIMIT 2;`);

        if (!rooms.length) {
            console.warn('⚠️ Không có dữ liệu trong bảng rooms. Hãy seed bảng rooms trước!');
            return;
        }

        await queryInterface.bulkInsert('room_details', [
            {
                id: randomUUID(),
                room_id: rooms[0].id,
                room_name: 'Phòng Standard',
                price: 1900000,
                description:
                    'Phòng Standard mang lại không gian thoải mái, sang trọng với tầm nhìn toàn cảnh thành phố. Trang bị đầy đủ tiện nghi hiện đại, phòng tắm riêng và ban công nhỏ.',
                images: JSON.stringify([
                    '/uploads/img/phong-1-dt1.webp',
                    '/uploads/rooms/phong-1-dt2.webp',
                    '/uploads/rooms/phong-1-dt3.jpg',
                    '/uploads/rooms/phong-1-dt4.jpg',
                ]),
                rating: 9.2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            {
                id: randomUUID(),
                room_id: rooms[1]?.id || rooms[0].id,
                room_name: 'Phòng Deluxe',
                price: 1900000,
                description:
                    'Phòng Deluxe Sang Trọng thích hợp cho các cặp đôi yêu thiên nhiên, tầm nhìn hướng vườn thoáng mát, nội thất gỗ ấm cúng và khu vực làm việc riêng tư.',
                images: JSON.stringify([
                    '/uploads/img/phong-2-dt1.webp',
                    '/uploads/img/phong-2-dt2.webp',
                    '/uploads/img/phong-2-dt3.webp',
                    '/uploads/img/phong-2-dt4.webp',
                ]),
                rating: 8.8,
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            {
                id: randomUUID(),
                room_id: rooms[2]?.id || rooms[0].id,
                room_name: 'Phòng Gia Đình',
                price: 1000000,
                description:
                    'Phòng Gia Đình Sang Trọng thích hợp cho các cặp đôi yêu thiên nhiên, tầm nhìn hướng vườn thoáng mát, nội thất gỗ ấm cúng và khu vực làm việc riêng tư.',
                images: JSON.stringify([
                    '/uploads/img/phong-3-dt1.webp',
                    '/uploads/img/phong-3-dt2.webp',
                    '/uploads/img/phong-3-dt3.webp',
                    '/uploads/img/phong-3-dt4.webp',
                ]),
                rating: 8.8,
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            {
                id: randomUUID(),
                room_id: rooms[4]?.id || rooms[0].id,
                room_name: 'Phòng Vip',
                price: 2000000,
                description:
                    'Phòng Vip Sang Trọng thích hợp cho các cặp đôi yêu thiên nhiên, tầm nhìn hướng vườn thoáng mát, nội thất gỗ ấm cúng và khu vực làm việc riêng tư.',
                images: JSON.stringify([
                    '/uploads/img/phong-4-dt1.webp',
                    '/uploads/img/phong-4-dt2.webp',
                    '/uploads/img/phong-4-dt3.webp',
                    '/uploads/img/phong-4-dt4.webp',
                ]),
                rating: 8.8,
                createdAt: new Date(),
                updatedAt: new Date(),
            },


            {
                id: randomUUID(),
                room_id: rooms[4]?.id || rooms[0].id,
                room_name: 'Phòng Superior',
                price: 1800000,
                description:
                    'Phòng Superior Sang Trọng thích hợp cho các cặp đôi yêu thiên nhiên, tầm nhìn hướng vườn thoáng mát, nội thất gỗ ấm cúng và khu vực làm việc riêng tư.',
                images: JSON.stringify([
                    '/uploads/img/phong-5-dt1.webp',
                    '/uploads/img/phong-5-dt2.webp',
                    '/uploads/img/phong-5-dt3.webp',
                    '/uploads/img/phong-5-dt4.webp',
                ]),
                rating: 8.8,
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            {
                id: randomUUID(),
                room_id: rooms[6]?.id || rooms[0].id,
                room_name: 'Phòng Single',
                price: 1800000,
                description:
                    'Phòng Single Sang Trọng thích hợp cho các cặp đôi yêu thiên nhiên, tầm nhìn hướng vườn thoáng mát, nội thất gỗ ấm cúng và khu vực làm việc riêng tư.',
                images: JSON.stringify([
                    '/uploads/img/phong-6-dt1.webp',
                    '/uploads/img/phong-6-dt2.webp',
                    '/uploads/img/phong-6-dt3.webp',
                    '/uploads/img/phong-6-dt4.webp',
                ]),
                rating: 8.8,
                createdAt: new Date(),
                updatedAt: new Date(),
            },


        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('room_details', null, {});
    },
};
