import { Router } from "express";
import { Request, Response } from "express";
import { ensureAuthentication } from "../middlewares/auth";
const router = Router()
router.post('/add_task',ensureAuthentication,(req:Request,res:Response)=>{
    const {entity} = req.body

    console.log(`Api is hit by ${req.user?.username} and the entity is ${entity}`)
    
})

export default router