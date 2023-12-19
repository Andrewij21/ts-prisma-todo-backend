import { Router } from "express";
import tasks_routes from "./tasks_routes";
import users_routes from "./users_routes";
const router = Router();

router.use("/users", users_routes);
router.use("/tasks", tasks_routes);

export default router;
