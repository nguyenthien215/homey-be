import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboard.controller.js";
// import { jwt } from "../middlewares/auth.js";

const dashboardRouter = Router();

// GET /api/v1/dashboard/stats - Lấy thống kê dashboard (tạm thời bỏ auth để test)
dashboardRouter.get("/stats", getDashboardStats);

export default dashboardRouter;