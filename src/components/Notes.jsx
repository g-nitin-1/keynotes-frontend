import React, { useState,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { useLoaderData } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Notes() {
    // const fetched_data = useLoaderData();

    // if(!fetched_data){
    //   return <p>Notes are being fetched</p>
    // }
    // let fetched_notes = fetched_data.map((note) => {
    //       return {title: note.title,content:note.content,id:note.number};
    // })

  const [notes, setNotes] = useState([]);

  const {checkCurrentUser} = useAuth();
  const link = "http://localhost:5000"
  
  useEffect(() => {

    let userEmail = checkCurrentUser();
    // alert("http://localhost:5000/"+userEmail+"/notes");
    const link = "https://bujji-9j6a.onrender.com/";
    fetch(link+userEmail+"/notes")
    .then((res) => res.json())
    .then((data) =>{
      console.log(data);
      data.forEach(note => {
        setNotes(prevNotes => {
          return [...prevNotes,{title: note.title,content:note.content,id:note.number}];
        })
      });
    })
    .catch(err => {
      console.log(err.message);
    })
  },[link])

  function addNote(newNote) {

    setNotes(prevNotes => {
      return [...prevNotes, {title: newNote.title,content:newNote.content,id:newNote.number}];
    });
    
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return (noteItem.id?(noteItem.id!==id):(index!==id));
      });
    });
  }

  return (
    <div className="notes">
      {/* <Header /> */}
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem.id||index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      {/* <Footer /> */}
    </div>
  );
}

export default Notes ;
