import  express  from "express";
const router = express.Router()
import taskHandlers from "../controllers/task.js";
import checkAuth from "../middelwares/checkAuth.js";

router.get("/getUserTasks",checkAuth ,taskHandlers.getUserTasks)
router.post("/create",checkAuth, taskHandlers.createTask)
router.patch("/update",checkAuth, taskHandlers.updateTask)
router.delete("/delete/:id",checkAuth, taskHandlers.deleteTask)
export default router