import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Auth(){
    const [email,setEmail] = useState("");
    const [password, setPassword]= useState("");
    const navigate = useNavigate()

    const signUp= async() =>{
        const {error} = await supabase.auth.signUp({
            email,
            password
        })
        if(error) alert(error.message)
        else alert("Signup successful")
    }
    const login = async () =>{
        const {error} = await supabase.auth.signInWithPassword({
            email,
            password
        })
        if(error) alert(error.message);
        else navigate("/dashboard")
    };
    return (
        <div>
            <h2>Login/Signup</h2>
            <input
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={login}>Login</button>
            <button onClick={signUp}>Sign Up</button>
        </div>
    )
}