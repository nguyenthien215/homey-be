import express from "express";
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import cookieParser from "cookie-parser";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Server } from "socket.io";
import roomRoutes from "./routes/room.js";
import db from "./database/models/index.js";
import AppConfig from "./config/index.js";
import ApiRouter from "./routes/index.js";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const app = express();
const server = createServer(app);
const port = AppConfig.port || process.env.NODE_PORT || 3000;

// Giúp xác định __dirname trong ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Public thư mục uploads nằm bên ngoài thư mục BE
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

db.sequelize.sync({ force: false });

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// ===== PASSPORT JWT STRATEGY =====
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
      const user = await db.User.findByPk(payload.sub);
      if (!user) return done(null, false);
      return done(null, user);
    }
  )
);

app.use(passport.initialize());


// Routes
app.use("/api/rooms", roomRoutes);
app.use(`/api/${AppConfig.apiVersion}`, ApiRouter[AppConfig.apiVersion]);

server.listen(port, () => {
  console.log(`✅ Server listening on port ${port}`);
});

process.on("uncaughtException", (exception) => {
  console.error("❌ Uncaught Exception:", exception);
});
