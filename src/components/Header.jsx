import React,{useEffect, useState} from "react";
import HighlightIcon from '@mui/icons-material/Highlight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {

  const [isAuthenticated,setIsAuthenticated] = useState(false);
  const [loading,setLoading] = useState(false);
  const {currentUser,logout,checkAuth } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(currentUser){
      setIsAuthenticated(true);
    }
  },[]);

  async function handleSignOut(event){
    event.preventDefault();
    try {
        setLoading(true);
        let res = await logout();
        console.log(res);
        setIsAuthenticated(false);
        navigate("/home");
    } catch(e) {
        alert(e.message);
    }
    setLoading(false);
  }

  function handleClick(){
    setIsAuthenticated(true);
  }

  return (
    <header>
      <div className="navbar">
        <h1>
          <HighlightIcon />Keynotes
        </h1>
        <div className="links">
          <NavLink to='/' >Home</NavLink>
          <NavLink to='/notes' >Notes</NavLink>
        </div>
      </div>
      { 
        checkAuth() ? 
        <div className="registerlinks">
          <NavLink to='/login' aria-disabled={loading} onClick={handleSignOut}>Log Out</NavLink>
        </div>
        : 
        <div className="registerlinks">
          <NavLink to='/login' onClick={handleClick}>Login</NavLink>
          <img src="https://www.pngplay.com/wp-content/uploads/6/Forward-Slash-Symbol-PNG-HD-Quality.png" alt="/" />
          <NavLink to='/signin' onClick={handleClick}>Sign Up</NavLink>
        </div>
      }
      
      
    </header>
  );
}

export default Header;
