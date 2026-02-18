import { Router } from "express";
import req_extractor from "../middlewares/req_extractor";
import { getIntentController } from "../controller/agent.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { testLogin, testSignup } from "../controller/auth.controller";


const router = Router()

router.get("/", (req,res)=>{
    res.send("Router working")
})
router.get('/intents',authMiddleware, getIntentController)
router.post('/signup', testSignup)
router.post('/login', testLogin)

export default router