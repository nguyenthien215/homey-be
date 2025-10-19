'use strict';

import { randomUUID } from 'crypto';

export default {
    async up(queryInterface, Sequelize) {
        // Lấy danh sách tất cả phòng trong bảng rooms
        const [rooms] = await queryInterface.sequelize.query(`SELECT id, name FROM rooms ORDER BY name ASC;`);

        if (!rooms.length) {
            console.warn('⚠️ Không có dữ liệu trong bảng rooms. Hãy seed bảng rooms trước!');
            return;
        }

        // Tạo một object map tên phòng → id để dễ gán thủ công cho đúng
        const roomMap = {};
        rooms.forEach((room) => {
            roomMap[room.name] = room.id;
        });

        await queryInterface.bulkInsert('room_details', [
            {
                id: randomUUID(),
                room_id: roomMap['Phòng Standard'],
                room_name: 'Phòng Standard',
                price: 1900000,
                description:
                    'Phòng Standard mang lại không gian thoải mái, sang trọng với tầm nhìn toàn cảnh thành phố. Trang bị đầy đủ tiện nghi hiện đại, phòng tắm riêng và ban công nhỏ.',
                images: JSON.stringify([
                    'https://demo-be-hhq0.onrender.com/uploads/img/phong-1-dt1.webp',
                    'https://demo-be-hhq0.onrender.com/uploads/img/phong-1-dt2.webp',
                    'https://demo-be-hhq0.onrender.com/uploads/img/phong-1-dt3.jpg',
                    'https://demo-be-hhq0.onrender.com/uploads/img/phong-1-dt4.jpg',
                ]),
                rating: 9.2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: randomUUID(),
                room_id: roomMap['Phòng Deluxe'],
                room_name: 'Phòng Deluxe',
                price: 1900000,
                description:
                    'Phòng Deluxe sang trọng, tầm nhìn hướng vườn thoáng mát, nội thất gỗ ấm cúng và khu vực làm việc riêng tư.',
                images: JSON.stringify([
                    'https://demo-be-hhq0.onrender.com/uploads/img/phong-2-dt1.webp',
                    'https://demo-be-hhq0.onrender.com/uploads/img/phong-2-dt2.webp',
                    'https://demo-be-hhq0.onrender.com/uploads/img/phong-2-dt3.webp',
                    'https://demo-be-hhq0.onrender.com/uploads/img/phong-2-dt4.webp',
                ]),
                rating: 8.8,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: randomUUID(),
                room_id: roomMap['Phòng Gia Đình'],
                room_name: 'Phòng Gia Đình',
                price: 1000000,
                description:
                    'Phòng Gia Đình rộng rãi, phù hợp cho cả gia đình, tầm nhìn hướng vườn, không gian ấm cúng, trang bị đầy đủ tiện nghi.',
                images: JSON.stringify([
                    'https://demo-be-hhq0.onrender.com/uploads/img/phong-3-dt1.webp',
                    'https://demo-be-hhq0.onrender.com/uploads/img/phong-3-dt2.webp',
                    'https://demo-be-hhq0.onrender.com/uploads/img/phong-3-dt3.webp',
                    'https://demo-be-hhq0.onrender.com/uploads/img/phong-3-dt4.webp',
                ]),
                rating: 8.5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: randomUUID(),
                room_id: roomMap['Phòng VIP'],
                room_name: 'Phòng VIP',
                price: 2000000,
                description:
                    'Phòng VIP cao cấp với không gian sang trọng, hướng ra biển hoặc thành phố, nội thất hiện đại, thích hợp cho khách cao cấp.',
                images: JSON.stringify([
                    'https://demo-be-hhq0.onrender.com/uploads/img/phong-4-dt1.webp',
                    'https://demo-be-hhq0.onrender.com/uploads/img/phong-4-dt2.webp',
                    'https://demo-be-hhq0.onrender.com/uploads/img/phong-4-dt3.webp',
                    'https://demo-be-hhq0.onrender.com/uploads/img/phong-4-dt4.webp',
                ]),
                rating: 8.6,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: randomUUID(),
                room_id: roomMap['Phòng Superior'],
                room_name: 'Phòng Superior',
                price: 1800000,
                description:
                    'Phòng Superior mang đến sự kết hợp giữa sang trọng và tiện nghi, thích hợp cho kỳ nghỉ thư giãn.',
                images: JSON.stringify([
                    'https://demo-be-hhq0.onrender.com/uploads/img/phong-5-dt1.webp',
                    'https://demo-be-hhq0.onrender.com/uploads/img/phong-5-dt2.webp',
                    'https://demo-be-hhq0.onrender.com/uploads/img/phong-5-dt3.webp',
                    'https://demo-be-hhq0.onrender.com/uploads/img/phong-5-dt4.webp',
                ]),
                rating: 8.7,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: randomUUID(),
                room_id: roomMap['Phòng Single'],
                room_name: 'Phòng Single',
                price: 1800000,
                description:
                    'Phòng Single nhỏ gọn, tinh tế, phù hợp cho khách du lịch cá nhân hoặc đi công tác.',
                images: JSON.stringify([
                    'https://demo-be-hhq0.onrender.com/uploads/img/phong-6-dt1.webp',
                    'https://demo-be-hhq0.onrender.com/uploads/img/phong-6-dt2.webp',
                    'https://demo-be-hhq0.onrender.com/uploads/img/phong-6-dt3.webp',
                    'https://demo-be-hhq0.onrender.com/uploads/img/phong-6-dt4.webp',
                ]),
                rating: 9.0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('room_details', null, {});
    },
};
