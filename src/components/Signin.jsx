import React from "react";
import { useState, } from "react";

import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import { NavLink, useNavigate, } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Signin(){
    const [userCredentials , setUserCredentials] = useState({
        email: "",
        password: ""
    });
    const {signUp,currentUser} = useAuth();
    const [error,setError] =useState('');
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();


    function handleChange(event){
        let {name,value} = event.target;

        setUserCredentials ( (prev) => {
            return ({
                ...prev,
                [name] : value 
            });
        })
    }


   async function handleSubmit(event){
        event.preventDefault();
        try {
            setError('');
            setLoading(true);
            await signUp(userCredentials.email,userCredentials.password);
            navigate("/");
        } catch(e) {
            setError(e.message);
        }
        setLoading(false);
    }

    return (
        <>
            <div className="registerform">
                <h1>Sign Up</h1>
                {error && <p>{error}</p>}
                <form className="registerformdetails" onSubmit={handleSubmit}>
                    <label>Email</label>
                    <div className="registerforminput">
                        <MailIcon size="large"/>
                        <input name="email" type="email" value={userCredentials.email} placeholder="Type your email" onChange={handleChange} />
                    </div>
                
                    <label>Password</label>
                    <div className="registerforminput">
                        <LockIcon />
                        <input name="password" type="password" value={userCredentials.password} placeholder="Type your password" onChange={handleChange} />
                    </div>
                
                    <button type="submit" disabled={loading} className="registerbtn">Sign Up</button>
                </form>
            </div>
            <p>Already Have an account? 
                <NavLink to="/login" > Log In</NavLink>
            </p>
        </>
    )

}


export default Signin ;