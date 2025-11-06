import db from "../database/models/index.js";

class RoleRepository {
    constructor() {
        this.model = db.Role;
    }

    async getAllRoles() {
        return await this.model.findAll({ attributes: ["id", "name"] });
    }
}

export default RoleRepository;
