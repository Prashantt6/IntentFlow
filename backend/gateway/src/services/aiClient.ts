import axios from "axios";

const getIntent = async(input: string) =>{
    const response = await axios.post("http://127.0.0.1:8000/get_intent",{
        text: input
        
    })

    console.log(response.data)
}
getIntent("Yo kaam garde")