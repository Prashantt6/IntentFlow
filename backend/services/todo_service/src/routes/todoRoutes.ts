import { Router } from "express";
import { Request, Response } from "express";
const router = Router()
router.post('/add_task',(req:Request,res:Response)=>{
    const {entity} = req.body
    console.log(entity)
    
})

export default router