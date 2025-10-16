import { Router } from "express";
import routerUpload from "./upload.js";
import authRouter from "./auth.js";
import categoryRouter from "./category.js";
import userRouter from "./user.route.js";
import roomRouter from "./room.route.js";
import bookingRouter from "./booking.route.js";
import promotionRouter from "./promotion.route.js";
import reviewRouter from "./review.route.js";

const v1Router = Router();

v1Router
  .use("/upload", routerUpload)
  .use("/auth", authRouter)
  .use("/categories", categoryRouter)
  .use("/users", userRouter)
  .use("/rooms", roomRouter)
  .use("/bookings", bookingRouter)
  .use("/promotions", promotionRouter)
  .use("/reviews", reviewRouter);

export default { v1: v1Router };
