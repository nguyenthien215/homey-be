import CityRepository from "../repositories/city.repository.js";

class CityService {
    constructor() {
        this.repository = new CityRepository();
    }

    async getAllCities() {
        return await this.repository.getAllCities();
    }
}

export default CityService;
