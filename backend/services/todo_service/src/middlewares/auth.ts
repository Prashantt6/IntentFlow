    import jwt from 'jsonwebtoken'
    import { Request, Response, NextFunction } from 'express'

    interface AuthRequest extends Request {
        user?: any
    }

    export const ensureAuthentication = (req:AuthRequest, res: Response, next: NextFunction)=>{
        const auth = req.headers.authorization
        if(!auth?.startsWith("Bearer ")){
            return res.status(403)
                .json({
                    message: "NO token recieved"
                })
        }
        // console.log("Authorization header:", auth)
        if(!auth?.startsWith("Bearer ")){
            return res.status(403)
                .json({
                    message: "Unsupported token format"
                })
        }
        const token = auth.split(" ")[1]
        // console.log("Extracted token:", token)
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string)as JwtPayload
            
            req.user = decoded
            next()
        }
        catch(err){
            console.log(err)
            return res.status(400)
                .json({
                    message: "Invalid jwt token"
                })

        }
    }

    export interface JwtPayload {
    id: string
    username: string
    iat?: number
    exp?: number
    }
