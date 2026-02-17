import { get } from "node:http";
import getIntent from "../services/aiClient";
import { Request, Response } from "express";

const getIntentController = async (req: Request, res: Response)=>{
    const {input} = req.body
    const intent =await getIntent(input)
    
    console.log(intent)

}
export default getIntentController