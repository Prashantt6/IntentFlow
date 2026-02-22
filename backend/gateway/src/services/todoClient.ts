import axios from "axios";
import extract_entity from "./entity_extracter";

interface TodoResponse {
    message: string,
    task?: any[]
}

const todoService = async(input:string, intent: string, token: string |undefined)=>{
    const entity = await extract_entity(input, intent)
    // console.log(entity)
    // console.log(intent)
    try{
        const res =await axios.post<TodoResponse>(`http://todo:3001/${intent}`,
            { entity},
            {
                headers:{
                    Authorization: token
                }
        })
        

        return res.data
    }
    catch(error: any){
        console.error("Todo Service error:", error.respone?.data || error.message)
        
        return{
            message: error.respone?.data?.message || "Something went wrong",
            tasks:[]
        }
    }
   
}
export default todoService