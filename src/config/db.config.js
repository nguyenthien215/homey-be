export default {
  // url: process.env.DATABASE_URL || "mysql://root@95b3a0aff86e.ngrok-free.app/homey_db",
  url: process.env.DATABASE_URL || "mysql://avnadmin:AVNS_jz8Mc0Jpqu1-isCn30B@mysql-1561d5a8-nguyenthien22112005-ff3e.d.aivencloud.com:27401/defaultdb?ssl-mode=REQUIRED",
  dialect: process.env.DATABASE_DIALECT || "mysql",
  pool: {
    max: parseInt(process.env.DB_POOL_MAX, 10) || 5,
    min: parseInt(process.env.DB_POOL_MIN, 10) || 0,
    acquire: parseInt(process.env.DB_POOL_ACQUIRE, 10) || 30000,
    idle: parseInt(process.env.DB_POOL_IDLE, 10) || 10000,
  },
};

// export default {
//   // url: process.env.DATABASE_URL || "mysql://root@95b3a0aff86e.ngrok-free.app/homey_db",
//   url: process.env.DATABASE_URL || "mysql://root:nguyenthien22112005@localhost:3306/homey_db",
//   dialect: process.env.DATABASE_DIALECT || "mysql",
//   pool: {
//     max: parseInt(process.env.DB_POOL_MAX, 10) || 5,
//     min: parseInt(process.env.DB_POOL_MIN, 10) || 0,
//     acquire: parseInt(process.env.DB_POOL_ACQUIRE, 10) || 30000,
//     idle: parseInt(process.env.DB_POOL_IDLE, 10) || 10000,
//   },
// };