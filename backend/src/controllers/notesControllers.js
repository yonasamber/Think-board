import Note from "../models/Note.js"


export const getAllNotes = async(_, res)=>{
try {
const notes= await Note.find().sort({createdAt:-1})
res.status(200).json(notes)


}



catch(error){console.log("error in get allnotes controller", error.message)}

}

export const getNoteById = async(req, res)=>{
try{
    const note= await Note.findById(req.params.id)
    if(!note) return res.status(404).json({message:"Note can't be found"})
}
catch(error){console.log("can't find note", error)}
}



export const createNote = async(req, res)=>{

try {
    const{title, content} =req.body
    const newNote = new Note({title, content})
   await newNote.save()
    res.status(201).json(newNote)
}
catch(error){
    console.log("failed to create", error)
}

}

export const updateNote =async(req, res)=>{
   try {
    const {title, content} =req.body
const updatedNote =await Note.findByIdAndUpdate(req.params.id,{title, content})
if(!updateNote) {return res.status(404).json({message:"Note not found"})}
res.status(200).json({message:"Note updated Successfully"})
}

catch(error){console.log("error updating", error.message)}
   
}


export const deleteNote =async(req, res)=>{
    try{
    const deletedNote = await Note.findByIdAndDelete(req.params.id)
    if(!deletedNote) return res.status(404).json({message:"Note can't be found"})
res.status(200).json({message:"Note deleted successfully."})}
    catch(error){
        console.log("error deleting note", error.message)
    }
}