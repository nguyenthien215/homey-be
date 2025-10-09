import { Router } from "express";
import routerUser from "./user.js";
import routerUpload from "./upload.js";
import authRouter from "./auth.js";
import middlewares from "../middlewares/index.js";
import categoryRouter from "./category.js";
import roomRoutes from "./room.js";

export default {
  v1: Router()
    .use("/users", middlewares.jwt(), routerUser)
    .use("/upload", routerUpload)
    .use("/auth", authRouter)
    .use("/categories", categoryRouter)
    .use("/rooms", roomRoutes),  // Using categoryRouter for tags as well
};
