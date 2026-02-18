import { Router } from "express";
import req_extractor from "../middlewares/req_extractor";
import getIntentController from "../controller/agent.controller";
import { ensureAuthentication } from "../middlewares/auth";

const router = Router()

router.get("/", (req,res)=>{
    res.send("Router working")
})
router.get('/intents', ensureAuthentication, getIntentController)

export default router