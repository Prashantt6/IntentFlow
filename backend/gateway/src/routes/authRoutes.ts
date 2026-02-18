import { Router } from "express";
import { loginController, signupController } from "../controller/auth.controller";
import { ensureAuthentication } from "../middlewares/auth";

const router = Router()

router.post('/login',loginController)
router.post('/signup',signupController)
router.get('/jwt',ensureAuthentication)
export default router