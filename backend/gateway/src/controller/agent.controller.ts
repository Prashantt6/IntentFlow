import { get } from "node:http";
import getIntent from "../services/aiClient";
import { Request, Response } from "express";
import todoService from "../services/todoClient";


export const getIntentController = async (req: Request, res: Response)=>{
    const {input} = req.body
    const intent =await getIntent(input)
    const token = req.headers.authorization?.replace("Bearer", "")
    const supabase = (req as any).supabase
    const user = (req as any).user
    console.log(user.id)
    

    // console.log(`This api was hit by ${req.user?.username}`)
    if(intent === 'add_task' || intent==='delete_task' || intent==='list_tasks'){
        todoService(input, intent,token)
    }
    else if(intent === 'write_blog' ){
        
    }
    else if(intent === 'upload_photo' || intent ==='delete_photo' ){
        
    }
    res.json(`API called determining intent: ${intent}`)

}


