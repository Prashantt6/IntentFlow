import { Router } from "express";
import { Request, Response } from "express";
import { authMiddleware} from "../middlewares/auth";
import { addTaskController,deleteTaskController, listTaskController } from "../controllers/todoController";

const router = Router()
router.post('/add_task',authMiddleware,addTaskController)
router.post('/list_tasks', authMiddleware, listTaskController)
router.post('/delete_task', authMiddleware, deleteTaskController)

export default router