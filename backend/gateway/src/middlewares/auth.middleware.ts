import { Request, Response, NextFunction } from "express";
import { createSupabaseClient } from "../config/supabase";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction )=>{
    const authHeader = req.headers.authorization
    // console.log("AuthHeader", authHeader)
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const token = authHeader.split(" ")[1]
    // console.log(token)
    if(!token){
        return res.status(401) 
            .json({
                message: "Unauthorized"
            })
    }
    const supabase = createSupabaseClient(token)

    const {data, error} = await supabase.auth.getUser()
    
    if(error || !data) {
        console.error(error)
        return res.status(401)
            .json({
                message: "Invalid token"
            })
    }
    (req as any).supabase = supabase;
    (req as any).user= data.user

    next()
}