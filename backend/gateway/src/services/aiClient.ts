import axios from "axios";
import { get } from "node:http";

const getIntent = async(input: string) =>{
    try{
    const response = await axios.post("http://127.0.0.1:8000/get_intent",{
        text: input
        
    })

    const intent = response.data.intent

    
    // console.log(intent)
    return intent
    }
    catch(error){
        console.error(error)
        console.log("Error in calling aiService axios")
        return (
            "Error in calling aiService axios")
    }
}
// getIntent("Yo kaam garde")

export default getIntent