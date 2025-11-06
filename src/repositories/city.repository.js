import db from "../database/models/index.js";
import { QueryTypes } from "sequelize";

class CityRepository {
    async getCityByName(name) {
        try {
            const result = await db.sequelize.query(
                `SELECT * FROM cities WHERE name = :name LIMIT 1`,
                {
                    replacements: { name },
                    type: QueryTypes.SELECT,
                }
            );
            return result[0] || null;
        } catch (error) {
            throw new Error("Error fetching city: " + error.message);
        }
    }

    async getAllCities() {
        try {
            return await db.sequelize.query(`SELECT * FROM cities`, {
                type: QueryTypes.SELECT,
            });
        } catch (error) {
            throw new Error("Error fetching cities: " + error.message);
        }
    }
}

export default CityRepository;