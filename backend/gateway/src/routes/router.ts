import { Router } from "express";
import { getIntentController } from "../controller/agent.controller";
import { authMiddleware } from "../middlewares/auth.middleware";



const router = Router()

router.get("/", (req,res)=>{
    res.send("Router working")
})
router.post('/intents',authMiddleware, getIntentController)


export default router