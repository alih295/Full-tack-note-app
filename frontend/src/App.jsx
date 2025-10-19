import React, { useState } from "react";
import NoteList from "./components/NoteList";
import { IoAdd } from "react-icons/io5";
import AddNotes from "./components/AddNotes";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css'; 


function App() {
  const [createNote, setCreateNote] = useState(false);
  const [form, setForm] = useState({title:'' , content:''})
  const [editId, setEditId] = useState(null)

  return (
    <div className="w-full relative text-white transition-all duration-500  h-screen lg:p-10 p-4 bg-gray-800">
      <h1 className="text-3xl text-center mt-2 font-semibold">Notes App</h1>
      {createNote ? <AddNotes setCreateNote={setCreateNote} editId={editId} setEditId={setEditId} form = {form} setForm={setForm} /> : <NoteList editId={editId} setCreateNote={setCreateNote} setEditId={setEditId} form = {form} setForm={setForm}  />}
<ToastContainer />
      <div
        onClick={() => {
          setCreateNote(!createNote);
        }}
        className="fixed h-15 w-15 flex items-center transition-all duration-300  justify-center cursor-pointer bg-gray-200 bottom-20 right-15 rounded-full "
      >
        <IoAdd
          className={` transition-all duration-300 ${
            createNote ? "rotate-45" : "rotate-90"
          }   `}
          color="black"
          size={"40px"}
        />
      </div>
    </div>
  );
}

export default App;
