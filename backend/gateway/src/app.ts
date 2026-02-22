import "./config/env"  
import cors from 'cors'
import express from 'express'
import apiRouter from "./routes/router"

const app = express()

app.use(express.json());

const PORT = 3000
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT","PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true 
  })
);
app.use('/api',apiRouter)

app.get("/",(req,res)=>{
    res.send("Server is running")
})
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})