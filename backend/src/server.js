import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import cors from 'cors'
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimitter.js";
import path from 'path'

dotenv.config()


const app = express()



const port = process.env.PORT || 5000
 
const __dirname =path.resolve()

app.use(express.json())


if(process.env.NODE_ENV !== "production") {
app.use(cors({origin: "http://localhost:5173", credentials: true}))

}

app.use(rateLimiter)

app.use("/api/notes", notesRoutes)
app.use(express.static(path.join(__dirname,"../frontend/dist")))

if(process.env.NODE_ENV ==="production"){
    app.get("*",(req, res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist", "index.html"))
})
}

connectDB().then(()=>{

    app.listen(port,()=>{
        console.log("server is running on port ", port)
    })
})



