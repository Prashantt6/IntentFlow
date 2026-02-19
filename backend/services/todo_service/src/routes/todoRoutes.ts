import { Router } from "express";
import { Request, Response } from "express";
import { authMiddleware} from "../middlewares/auth";
import { addTaskController, listTaskController } from "../controllers/todoController";
const router = Router()
router.post('/add_task',authMiddleware,addTaskController)
router.post('/list_tasks', authMiddleware, listTaskController)

export default router