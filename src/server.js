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

// ===================== PATH CONFIG =====================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===================== STATIC FILES =====================
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ===================== CORS CONFIG =====================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://homey-oaqp.vercel.app" // FE deploy trên Vercel
    ],
    credentials: true,
  })
);

// ===================== BODY PARSER + COOKIE =====================
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

// ===================== MAIN API ROUTE =====================
app.use(`/api/${AppConfig.apiVersion}`, ApiRouter[AppConfig.apiVersion]);


app.get("/rooms", (req, res) => {
  // Khi FE gọi nhầm /rooms, backend sẽ tự chuyển hướng đúng /api/v1/rooms
  res.redirect(307, `/api/${AppConfig.apiVersion}/rooms`);
});

// ===================== SOCKET.IO =====================
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://homey-oaqp.vercel.app"
    ],
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
