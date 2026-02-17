import axios from "axios";
import { get } from "node:http";

const getIntent = async(input: string) =>{
    const response = await axios.post("http://127.0.0.1:8000/get_intent",{
        text: input
        
    })

    const intent = response.data.intent

    
    // console.log(intent)
    return intent

}
// getIntent("Yo kaam garde")

export default getIntent