import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import cors from 'cors'
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimitter.js";

dotenv.config()


const app = express()



const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors({origin: "http://localhost:5173", credentials: true}))

app.use(rateLimiter)

app.use("/api/notes", notesRoutes)

connectDB().then(()=>{

    app.listen(port,()=>{
        console.log("server is running on port ", port)
    })
})



