import db from "../database/models/index.js";
import { QueryTypes } from "sequelize";

class RoleRepository {
    async getRoleByName(name) {
        try {
            const result = await db.sequelize.query(
                `SELECT * FROM roles WHERE name = :name LIMIT 1`,
                {
                    replacements: { name },
                    type: QueryTypes.SELECT,
                }
            );
            return result[0] || null;
        } catch (error) {
            throw new Error("Error fetching role: " + error.message);
        }
    }

    async getAllRoles() {
        try {
            return await db.sequelize.query(`SELECT * FROM roles`, {
                type: QueryTypes.SELECT,
            });
        } catch (error) {
            throw new Error("Error fetching roles: " + error.message);
        }
    }
}

export default RoleRepository;
