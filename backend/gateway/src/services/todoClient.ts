import axios from "axios";
import extract_entity from "./entity_extracter";

const todoService = async(input:string, intent: string)=>{
    const entity = await extract_entity(input, intent)
    console.log(entity)
    const res =await axios.post("http://localhost:3001/",{
        
    })
}
export default todoService