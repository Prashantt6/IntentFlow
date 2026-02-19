import { get } from "node:http";
import getIntent from "../services/aiClient";
import { Request, Response } from "express";
import todoService from "../services/todoClient";


export const getIntentController = async (req: Request, res: Response)=>{
    const {input} = req.body

    const intent =await getIntent(input)
    const token = req.headers.authorization

    let serviceResponse = null;
    // console.log(user)
    

    // console.log(`This api was hit by ${req.user?.username}`)
    if(intent === 'add_task' || intent==='delete_task' || intent==='list_tasks'){
        // console.log("HI from todoService agent controller")
        serviceResponse = await   todoService(input, intent,token)
    }
    else if(intent === 'write_blog' ){
        
    }
    else if(intent === 'upload_photo' || intent ==='delete_photo' ){
        
    }
    res.json({
        Identity: `API called determining intent: ${intent}`,
        Response: serviceResponse
    })

}


