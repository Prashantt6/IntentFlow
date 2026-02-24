import axios from "axios";

const GROQ_API_URL ="https://api.groq.com/openai/v1/chat/completions"

const extract_entity= async (input:string,intent:string) =>{
    const userMessage = input
    const userIntent = intent
    
    try{
        const response = await axios.post(GROQ_API_URL,{
            model: "llama-3.1-8b-instant",
            messages: [
                {
                role: "system",
                content: `
                You are a strict entity extraction engine.

                Your job:
                Extract ONLY the main entity from the user's input based on the given intent.

                Rules:
                - The entity may be in Nepali, English, or mixed language.
                - Preserve original wording exactly (do NOT translate).
                - Do NOT rephrase.
                - Do NOT explain.
                - Do NOT add extra words.
                - If no entity exists for the intent (example: list_tasks), return: NONE
                - Output must be plain text only.
                - Output must contain only the entity or NONE.
                `
                },
                {role: "user",
                    content: `
                              User input: ${userMessage}
                              User intent: ${userIntent}
                              `
                }
            ],
            temperature:0.8,
            
        },
        {
            headers:{
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            timeout:20000
        }
    )
    const entity = response.data.choices[0].message.content
    console.log("Entity:", entity)

    return entity
    }
    catch(error){
        console.error("GROQ AI Error:",error)
        throw new Error("AI service unavailable")
    }
}
export default extract_entity