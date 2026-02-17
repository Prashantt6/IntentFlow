import { Request, Response, NextFunction} from "express"

const req_extractor = (req: Request,res: Response,next: NextFunction) =>{
    const {input} = req.body
    console.log(input)
    next()
}
export default req_extractor