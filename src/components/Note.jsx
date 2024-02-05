import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../context/AuthContext";

function Note(props) {

  const {checkCurrentUser}=useAuth();
  // const link = "http://localhost:5000/"
  const link = "https://keynotes-api.onrender.com/"
  async function deleteNote(){

    let userEmail=checkCurrentUser();
    // console.log({id:props.id})
    await fetch(link+userEmail+"/notes/"+props.id,{
      method: "delete",
    })
    .catch((err) => {
      console.log(err.message);
    })
     //location.reload();
  }


  function handleClick() {
    deleteNote();
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
