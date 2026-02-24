import { Request, Response } from "express";
import { createSupabaseClient } from "../config/supabase";
import { title } from "node:process";
import { addTaskService, deleteTaskService, listTaskService } from "../services/todoService";

export const addTaskController = async(req:Request, res: Response) =>{
   try{
        const supabase = (req as any).supabase
        const user = (req as any).user
        
        const {entity} = req.body

        const tasks= await addTaskService(supabase,user.id, entity)
        // console.log(tasks)
        return res.status(201).json({
            message: "Task added",
            tasks
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
        // console.log(tasks)
        return res.status(201)
            .json({
                message: "Here are all your tasks",
                tasks
            })
    }
    catch(error){
        console.error(error)
        res.status(500).json({
            message: "Database error"
        })
    }
}

export const deleteTaskController = async(req: Request, res: Response)=>{
    try{
        const supabase = (req as any).supabase
        const user = (req as any).user
        const {entity} = req.body
        const title = await deleteTaskService(supabase, user.id, entity)

        return res.status(201)
            .json({
                message: "Your task was successfully deleted",
                title
            })
        
    }
    catch(error){
        console.error(error)
        res.status(500).json({
            message: "Task title mismatched"
        })
    }
}