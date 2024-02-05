import React from "react";
import { useState } from "react";

import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login(){
    const [userCredentials , setUserCredentials] = useState({
        email: "",
        password: ""
    });
    
    const {login} = useAuth();
    const [error,setError]= useState('');
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

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(userCredentials.email,userCredentials.password);
            navigate("/");
        }catch(error){
            setError(error.message);
        }
        setLoading(false);
    }

    return (
        <>
            <div className="registerform">
                <h1>Login</h1>
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
                        <input name="password" value={userCredentials.password} placeholder="Type your password" onChange={handleChange} />
                    </div>
                    <NavLink id="forgotpassword" to="/forgotpassword"> forgot password</NavLink>
                    <button disabled={loading} className="registerbtn" type="submit" >Login</button>
                </form>
            </div>
            <p>Create an account? <NavLink to="/signin">Sign Up</NavLink></p>
        </>
    )

}


export default Login ;