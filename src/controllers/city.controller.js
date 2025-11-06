import CityService from "../services/city.service.js";

class CityController {
    constructor() {
        this.service = new CityService();
    }

    async getAllCities(req, res) {
        try {
            const cities = await this.service.getAllCities();
            res.json({ success: true, data: cities });
        } catch (error) {
            console.error("Error fetching cities:", error);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    }
}

export default CityController;
