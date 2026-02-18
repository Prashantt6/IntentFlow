import express from 'express'
import todo_Router from './routes/todoRoutes'
const app = express()
app.use(express.json())
const PORT = 3001

app.use('/',todo_Router)
app.post("/",(req,res)=>{
    res.send("TODO service is running")
    console.log("TODO microservice called")
})

app.listen(PORT)