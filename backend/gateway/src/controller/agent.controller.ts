import { get } from "node:http";
import getIntent from "../services/aiClient";
import { Request, Response } from "express";
import todoService from "../services/todoClient";

const getIntentController = async (req: Request, res: Response)=>{
    const {input} = req.body
    const intent =await getIntent(input)
    
    console.log(intent)
    if(intent === 'add_task' || intent==='delete_task' || intent==='list_tasks'){
        todoService(input, intent)
    }
    else if(intent === 'write_blog' ){
        
    }
    else if(intent === 'upload_photo' || intent ==='delete_photo' ){
        
    }
    res.json(`API called determining intent: ${intent}`)

}
export default getIntentController