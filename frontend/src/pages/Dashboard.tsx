import { useState } from "react";
import axios from "axios";
import { supabase } from "../lib/supabase";

export default function Dashboard(){
    const [input, setInput] = useState("")

    const sendToBackend = async() =>{
        const {
            data: {session},
        } = await supabase.auth.getSession();
        if(!session){
            alert("Not logged in");
            return
        }

        const res = await axios.post(
            "http://localhost:8000/api/intents",
            {input},
            {
                headers: {
                    Authorization: `Bearer ${session.access_token}`
                }
            }
        );
        console.log(res.data)
    };
    return(
        <div>
            <h2>Dashboard</h2>
            <input
                placeholder="Type anything you want to do"
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendToBackend}>Send</button>
        </div>
    )
}