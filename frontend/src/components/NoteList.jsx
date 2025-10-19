import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { toast } from 'react-toastify';
import api from '../api'
function NoteList({form ,setForm ,editId, setEditId ,setCreateNote}) {
   const [notes, setNotes] = useState([])
   const [showDescription, setShowDescription] = useState()
   
   useEffect(() => {
      api.get('/notes')
         .then((res) => {
            setNotes(res.data)

         })
         .catch((err) => console.log(err))
   }, [])
   const handleDelete = async (id) => {

      try {
         await api.delete(`/notes/${id}`)
         setNotes(notes.filter(note => note._id !== id));
        toast.error("Note deleted successfully!");
      } catch (err) {
         console.log(err)
      }
   }

   const editNote = (note)=>{
      setForm({title : note.title , content:note.content})
      setEditId(note._id)
      setCreateNote(true)
   }


   return (
      <div className='w-full h-[90%] overflow-x-auto flex flex-col gap-5 mt-5 shadow-sm shadow-white rounded-lg p-5  bg-gray-900'  >
         {
            notes.map((notes, index) => {
               return (
                  <div onClick={() => {
                     setShowDescription(index)
                  }} key={notes._id} className={` relative w-full px-4 py-2 rounded-sm  overflow-hidden transition-all duration-800 ${showDescription === index ? ' max-h-[500px] bg-gray-100 text-black' : 'lg:max-h-[40px] max-h-[50px] bg-gray-700  '}`}>
                     <h3 className='lg:text-xl text-3xl mb-2 capitalize '>title : {notes.title}</h3>
                     <p className='lg:text-sm text-xl'>Description:{notes.content}</p>


                     <div className={` ${showDescription == index ? 'opacity-40' : '' } absolute rounded-lg lg:bg-transparent lg:text-white  bg-gray-200 hover:opacity-100 px-2 py-2 text-black lg:right-5 flex items-center top-2 right-2 justify-center gap-2 lg:top-1`}>


                        <MdDelete onClick={() => {
                        handleDelete(notes._id
                        )
                     }} className='cursor-pointer lg:text-white text-black  hover:text-red-500  transition-color duration-300 hover:scale-120' size={'20px'} /> <FiEdit onClick={()=>{
                        editNote(notes)
                     }}  className='cursor-pointer lg:text-white text-black hover:text-red-500 transition-color duration-300 hover:scale-120 ' size={'20px'} />
                     </div>
                  </div>
               )
            })
         }
      </div>
   )
}

export default NoteList