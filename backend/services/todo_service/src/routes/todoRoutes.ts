import { Router } from "express";
import { Request, Response } from "express";
import { authMiddleware} from "../middlewares/auth";
import { addTaskController } from "../controllers/todoController";
const router = Router()
router.post('/add_task',authMiddleware,addTaskController)

export default router