import mongoose from "mongoose"

export const connectDB =async()=>{
    try {
      await  mongoose.connect(process.env.MONGO_URI)
    
      console.log("MONGODB connected successfuly")
    }
    catch(error){console.log("error connecting to the server",error.message)
        process.exit(1)
    }
}