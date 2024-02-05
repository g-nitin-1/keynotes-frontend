import React from "react";
import { useState } from "react";

function SignUp(){
    const [userCredentials , setUserCredentials] = useState({
        email: "",
        password: ""
    });
    
    function handleChange(event){
        let {name,value} = event.target;

        setUserCredentials ( (prev) => {
            return ({
                ...prev,
                [name] : value 
            });
        })
    }

    return (
        <div className="registerform">
            <div >
                <input name="email" value={userCredentials.email} placeholder="Email" onChange={handleChange} />
                <input name="password" value={userCredentials.password} placeholder="Password" onChange={handleChange} />
            </div>
        </div>
    )

}



function Userregister(){
    const [ isLogin , setIsLogin ] = useState(False);

    return (
        <div className="registerpage" >
            <h1>
                <HighlightIcon />Keynotes
            </h1>
            <div >

            </div>
        </div>
    )
}