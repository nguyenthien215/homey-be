import { Router } from "express";
import CityController from "../controllers/city.controller.js";

const router = Router();
const controller = new CityController();

router.get("/", controller.getAllCities.bind(controller));

export default router;
