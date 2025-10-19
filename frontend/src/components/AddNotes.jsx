import React, { useState } from "react";
import api from "../api";
 import { toast } from 'react-toastify';

function AddNotes({ form, setForm, editId, setEditId, setCreateNote }) {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/notes/${editId}`, form);
        setEditId(null);
        setCreateNote(false);
        setForm({ title: "", content: "" });
      } else {
        const res = await api.post("/notes", form);
        toast.success('note added succesfully');
          setCreateNote(false);
        setForm({ title: "", content: "" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex lg:items-start lg:justify-start items-center flex-col justify-center  h-[70vh]">
    
      {/* <h1 className="text-2xl font-bold  mt-5">Create Notes Here</h1> */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 gap-5 lg:items-start items-center lg:justify-start justify-center lg:w-1/2 w-full  shadow-md shadow-white flex flex-col rounded-lg  p-5  h-auto bg-gray-900"
      >
        <input
          value={form.title}
          onChange={(e) => {
            handleChange(e);
          }}
          className="w-full lg:text-lg text-3xl px-5 py-2 bg-transparent outline-none shadow shadow-white rounded-md"
          type="text"
          placeholder="Enter Text Here"
          name="title"
        />
        <textarea
          onChange={(e) => {
            handleChange(e);
          }}
          value={form.content}
          className="w-full resize-none lg:text-lg text-3xl px-5 py-2 bg-transparent outline-none shadow shadow-white rounded-md"
          name="content"
          placeholder="Enter Details Here "
        ></textarea>
        <input
          className="w-full py-2 bg-gray-200 cursor-pointer text-black lg:text-lg text-2xl rounded-md "
          type="submit"
          value={`${editId ? "Update Note" : "Add Note"}`}
        />
      </form>
    </div>
  );
}

export default AddNotes;
