import express from "express";
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import cookieParser from "cookie-parser";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Server } from "socket.io";
import db from "./database/models/index.js";
import AppConfig from "./config/index.js";
import ApiRouter from "./routes/index.js";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const app = express();
const server = createServer(app);
const port = AppConfig.port || process.env.NODE_PORT || 3000;

//  Xác định __dirname trong ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Public thư mục uploads (nếu FE cần truy cập ảnh từ ../uploads)
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

//  Cấu hình CORS (cho phép FE gọi API có cookie/token)
app.use(
  cors({
    origin: ["http://localhost:5173",
      "https://homey-oaqp.vercel.app"
    ],

    credentials: true,
  })
);

// Body parser + cookie
app.use(express.json());
app.use(cookieParser());

// ===================== PASSPORT JWT STRATEGY =====================
const jwtFromRequest = ExtractJwt.fromExtractors([
  ExtractJwt.fromAuthHeaderAsBearerToken(),
  (req) => req.cookies.accessToken,
]);

passport.use(
  new Strategy(
    {
      jwtFromRequest,
      secretOrKey: AppConfig.jwt.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await db.User.findByPk(payload.sub);
        if (!user) return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

app.use(passport.initialize());

// ===================== ROUTES =====================
app.use(`/api/${AppConfig.apiVersion}`, ApiRouter[AppConfig.apiVersion]);

// ===================== SOCKET.IO =====================
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("✅ New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// ===================== DATABASE =====================
// ===================== DATABASE =====================
db.sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("✅ Database synchronized successfully.");
  })
  .catch((err) => {
    console.error("❌ Database synchronization error:", err);
  });

// ===================== DEFAULT ROUTE =====================
app.get("/", (req, res) => {
  res.send("✅ Homey Backend is running successfully on Render!");
});

// ===================== SERVER START =====================
server.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
  console.log(`🌐 API base: http://localhost:${port}/api/${AppConfig.apiVersion}`);
});

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});

