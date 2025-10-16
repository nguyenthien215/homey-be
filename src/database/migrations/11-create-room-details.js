'use strict';

export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('room_details', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('(UUID())'),
                allowNull: false,
                primaryKey: true,
            },
            room_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'rooms',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            room_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            // Lưu nhiều ảnh ở dạng JSON
            images: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            rating: {
                type: Sequelize.FLOAT,
                defaultValue: 0,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('room_details');
    },
};
