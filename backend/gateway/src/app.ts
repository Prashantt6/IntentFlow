import dotenv from "dotenv"


import express from 'express'
import apiRouter from "./routes/router"
// import authRouter from "./routes/authRoutes"

dotenv.config()

const app = express()

app.use(express.json());

const PORT = 8000

app.use('/api',apiRouter)
// app.use('/',authRouter)
app.get("/",(req,res)=>{
    res.send("Server is running")
})
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})