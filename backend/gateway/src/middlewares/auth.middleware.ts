import { Request, Response, NextFunction } from "express";
import { createSupabaseClient } from "../config/supabase";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction )=>{
    const token = req.headers.authorization?.replace("Bearer ", "").trim()
    
    if(!token){
        return res.status(401) 
            .json({
                message: "Unauthorized"
            })
    }
    const supabase = createSupabaseClient(token)

    const {data, error} = await supabase.auth.getUser()

    if(error || !data) {
        return res.status(401)
            .json({
                message: "Invalid token"
            })
    }
    (req as any).supabase
    (req as any).data

    next()
}