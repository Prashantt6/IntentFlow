import axios from "axios";
import extract_entity from "./entity_extracter";

const todoService = async(input:string, intent: string)=>{
    const entity = await extract_entity(input, intent)
    console.log(entity)
}
export default todoService