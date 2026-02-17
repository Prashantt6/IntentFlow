import express from 'express'

const app = express()
const PORT = 3001
app.post("/",(req,res)=>{
    res.send("TODO service is running")
    console.log("TODO microservice called")
})

app.listen(PORT)