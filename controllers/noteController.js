const notesModel = require('../models/Notes.Model')

module.exports.getNotes = async (req,res)=>{
   console.log("➡️  getNotes triggered");
try{
   const notes = await notesModel.find()
   console.log('fetched Notes' , notes)
   res.json(notes)
}
catch (err) {
res.status(400).json(err)
}
}

module.exports.createNotes = async (req,res)=>{
   try{
const createdNotes = new notesModel(req.body)
await createdNotes.save()
res.status(200).json(createdNotes)
   }
catch(err){
   res.status(400).json({message: err.message})
}
}

module.exports.deleteNote = async (req, res) => {

  try {
    const deletedNote = await notesModel.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateNote = async (req,res)=>{

try{
   const updatedNote = await notesModel.findByIdAndUpdate(
  req.params.id,
  req.body,
  { new: true, runValidators: true }
);

   if(!updatedNote){
      return res.status(404).json('note not found') 
   } 
    return res.status(200).json({
      message: "Note updated successfully",
      data: updatedNote,
    });
} catch(err){
   res.status(404).json({message:err.message})
}
}