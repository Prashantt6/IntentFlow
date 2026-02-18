import { createClient } from "@supabase/supabase-js";

const supabaseUrl= process.env.SUPABASE_URL as string
const supabaseKey= process.env.SUPABASE_ANON_KEY as string

if(!supabaseUrl || !supabaseKey){
    throw new Error("Supabase environment variables missing")
}
export const supabase = createClient(supabaseUrl, supabaseKey)

export const createSupabaseClient = (token:string) =>{
    return createClient(
        supabaseUrl,supabaseKey,
        {
            global:token?{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            :{}
        }
    )
}
