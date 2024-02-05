import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../context/AuthContext";

function CreateArea(props) {
  let [isExpanded, setIsExpanded] = useState(false);
  const {checkCurrentUser}=useAuth();

  function handleClick() {
    setIsExpanded(true);
  }

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }
  let Note;
  async function sendNote(event){
    event.preventDefault();
    let userEmail = checkCurrentUser();
    // alert(userEmail);
    // console.log("http://localhost:5000/"+userEmail+"/notes");
    Note = {
    title:note.title,
    content:note.content,
    number:uuidv4()
    };
    // https://keynotes-api.onrender.com/notes
    // http://localhost:5000/notes
    await fetch("https://bujji-9j6a.onrender.com/"+userEmail+"/notes",{
      method: "post",
      body: JSON.stringify(Note),
      headers:{
        "Content-type":"application/json ; charset=UTF-8"
      }
    })
    .then((response) => response.json())
   .then((data) => {
    console.log(data);
    // Handle data
 })
 .catch((err) => {
    console.log(err.message);
 });
    
  }

function submitNote(event) {
    sendNote(event);
     props.onAdd(Note);
    setNote({
      title: "",
      content: ""
    });
    // location.reload();
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note" >
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={handleClick}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
