import React from "react";
import { useState } from "react";

import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Forgotpassword(){
    const [userEmail , setUserEmail] = useState({
        email: ""
    });
    
    const [btnclick , setBtnClick] = useState(false);
    const {resetPassword} = useAuth();
    const navigate = useNavigate();
    const [error,setError] = useState('');


    function handleChange(event){
        let {name,value} = event.target;

        setUserEmail( () => {
            return ({
                [name] : value 
            });
        })

        setBtnClick( () => {
            return(false);
        })
    }

    async function handleSubmit(event){
        event.preventDefault();
        try{
            setError('');
            setBtnClick(true);
            await resetPassword(userEmail.email);
            alert("Reset link is set to your mail");
            navigate("/login");
        }catch(error){
            setError(error.message);
        }
        setBtnClick(false);
    }

   
    return (
        <div className="registerform">
            {(btnclick && error) ? <p>Link is sent to your email.</p> : <p>Enter your registered email address.</p> }
            { error && <p>{error}</p> }
            <form className="registerformdetails" onSubmit={handleSubmit}>
                <label>Email</label>
                <div className="registerforminput">
                    <MailIcon size="large"/>
                    <input name="email" type="email" value={userEmail.email} placeholder="Type your email" onChange={handleChange} />
                </div>
                
                <button type="submit" className="registerbtn" >Reset</button>
            </form>
        </div>
    )

}


export default Forgotpassword ;