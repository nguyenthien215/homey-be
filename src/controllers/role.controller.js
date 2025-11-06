import RoleService from "../services/role.service.js";

class RoleController {
    constructor() {
        this.service = new RoleService();
    }

    async getAllRoles(req, res) {
        try {
            const roles = await this.service.getAllRoles();
            res.json({ success: true, data: roles });
        } catch (error) {
            console.error("Error fetching roles:", error);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    }
}

export default RoleController;
