import { Router } from "express";
import task_controllers from "../controllers/task_controllers";
import validate from "../utils/validator/validate";
import {
  CreateRules,
  IdParamsRules,
  UpdateRules,
} from "../utils/validator/rules/task_rules";
const router = Router();

router
  .route("/")
  .get(task_controllers.getAllTasks)
  .post(validate(CreateRules), task_controllers.createTask);

router
  .route("/:id")
  .all(validate(IdParamsRules))
  .get(task_controllers.getTaskById)
  .patch(validate(UpdateRules), task_controllers.updateTaskById)
  .delete(task_controllers.deleteTaskById);

export default router;
