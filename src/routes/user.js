// import { Router } from "express";
// import UserController from "../controllers/user.controller.js";
// import UserValidator from "../validators/user.validator.js";

// const validator = new UserValidator();
// const controller = new UserController();
// const router = Router();
// // define the user route
// router.get("/", controller.getListUsers);
// router.get("/:id", controller.getUserById);
// router.post("/", validator.createUserSchema(), controller.createUser);
// router.put("/:id", controller.updateUser);
// router.delete("/:id", controller.deleteUser);

// export default router;


import { Router } from "express";
import { UserValidator } from "../validators/user.validator.js";
import * as userController from "../controllers/user.controller.js";

const router = Router();

router.post(
    "/",
    UserValidator.createUserSchema(),
);

export default router;
