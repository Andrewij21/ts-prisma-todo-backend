import { Router } from "express";
import user_controllers from "../controllers/user_controllers";
import validate from "../utils/validator/validate";
import {
  CreateRules,
  IdParamsRules,
  UpdateRules,
} from "../utils/validator/rules/user_rules";
const router = Router();

router
  .route("/")
  .get(user_controllers.getAllUsers)
  .post(validate(CreateRules), user_controllers.createUser);

router
  .route("/:id")
  .all(validate(IdParamsRules))
  .get(user_controllers.getUserById)
  .patch(validate(UpdateRules), user_controllers.updateUserById)
  .delete(user_controllers.deleteUserById);

export default router;
