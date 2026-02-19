import { Request, Response } from "express";
import { createSupabaseClient } from "../config/supabase";
import { title } from "node:process";
import { addTaskService, listTaskService } from "../services/todoService";

export const addTaskController = async(req:Request, res: Response) =>{
   try{
        const supabase = (req as any).supabase
        const user = (req as any).user
        
        const {entity} = req.body

        const task= await addTaskService(supabase,user.id, entity)
        console.log(task)
        return res.status(201).json({
            message: "Task added",
            task
        })
   }
   catch(error){
        console.error(error)
        res.status(500).json({
            message: "Database error"
        })
   }

}
export const listTaskController= async(req: Request, res:Response) =>{
    try{
        const supabase = (req as any).supabase
        const user = (req as any).user
        const tasks = await listTaskService(supabase, user.id)
        console.log(tasks)
    }
    catch(error){
        console.error(error)
        res.status(500).json({
            message: "Database error"
        })
    }
}