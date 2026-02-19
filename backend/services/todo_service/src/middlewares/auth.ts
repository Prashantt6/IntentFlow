    import { userInfo } from 'node:os'
import { createSupabaseClient } from '../config/supabase'
    import { Request, Response, NextFunction } from 'express'

    
    export const authMiddleware = async (req:Request, res: Response, next: NextFunction)=>{
       const token = req.headers.authorization?.replace("Bearer ", "").trim()

    //    console.log(token)
       if(!token){
        return res.status(401)
            .json({
                message: "Unauthorized"
            })
       }
       const supabase = createSupabaseClient(token)

       const {data, error} = await supabase.auth.getUser()
    //    console.log(data.user?.email)
       if(error || !data.user){
        console.error(error)
            return res.status(401)
                .json({
                    message: "Invalid token "
                })
       }
       (req as any).supabase = supabase;
       (req as any).user = data.user;

       next()
        
    }

 
