import axios from "axios";
import extract_entity from "./entity_extracter";
import { text } from "node:stream/consumers";

const todoService = async(input:string, intent: string, token: string |undefined)=>{
    const entity = await extract_entity(input, intent)
    console.log(entity)
    
    const res =await axios.post(`http://localhost:3001/${intent}`,
       { entity},
       {
        headers:{
            Authorization: token
        }
    })
    console.log(res.data)
}
export default todoService