import db from "../database/models/index.js";

const { User, Room, Booking, Payment, Category, sequelize } = db;

export const getDashboardStats = async (req, res) => {
    try {
        // Lấy thống kê tổng quan
        const [
            totalUsers,
            totalRooms,
            totalBookings,
            totalRevenue,
            recentBookings,
            monthlyRevenue,
            roomsByCategory
        ] = await Promise.all([
            // Tổng số users
            User.count(),

            // Tổng số rooms
            Room.count(),

            // Tổng số bookings
            Booking.count(),

            // Tổng doanh thu từ payments với status = 'paid'
            Payment.sum('amount', {
                where: { status: 'paid' }
            }),

            // 5 booking gần đây nhất
            Booking.findAll({
                limit: 5,
                order: [['createdAt', 'DESC']],
                attributes: ['id', 'guest_name', 'check_in_date', 'total_amount', 'status', 'createdAt']
            }),

            // Doanh thu theo tháng trong năm hiện tại
            sequelize.query(`
                SELECT 
                    MONTH(createdAt) as month,
                    COALESCE(SUM(amount), 0) as revenue
                FROM payments 
                WHERE YEAR(createdAt) = YEAR(CURDATE()) 
                    AND status = 'paid'
                GROUP BY MONTH(createdAt)
                ORDER BY MONTH(createdAt)
            `, { type: sequelize.QueryTypes.SELECT }),

            // Số lượng rooms theo category
            sequelize.query(`
                SELECT 
                    c.name,
                    COUNT(r.id) as count
                FROM categories c
                LEFT JOIN rooms r ON c.id = r.category_id
                GROUP BY c.id, c.name
                HAVING COUNT(r.id) > 0
                ORDER BY COUNT(r.id) DESC
            `, { type: sequelize.QueryTypes.SELECT })
        ]);

        // Chuyển đổi dữ liệu monthly revenue để có đủ 12 tháng
        const months = [
            "T1", "T2", "T3", "T4", "T5", "T6",
            "T7", "T8", "T9", "T10", "T11", "T12"
        ];

        const monthlyRevenueFormatted = months.map((monthName, index) => {
            const monthData = monthlyRevenue.find(item => item.month === index + 1);
            return {
                month: monthName,
                revenue: monthData ? parseFloat(monthData.revenue) : 0
            };
        });

        const stats = {
            totalUsers: totalUsers || 0,
            totalRooms: totalRooms || 0,
            totalBookings: totalBookings || 0,
            totalRevenue: totalRevenue || 0,
            recentBookings: recentBookings || [],
            monthlyRevenue: monthlyRevenueFormatted,
            roomsByCategory: roomsByCategory || []
        };

        res.status(200).json({
            success: true,
            message: "Lấy thống kê dashboard thành công",
            data: stats
        });

    } catch (error) {
        console.error("Dashboard stats error:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy thống kê dashboard",
            error: error.message
        });
    }
};