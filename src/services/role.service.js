import RoleRepository from "../repositories/role.repository.js";

class RoleService {
    constructor() {
        this.repository = new RoleRepository();
    }

    async getAllRoles() {
        return await this.repository.getAllRoles();
    }
}

export default RoleService;
