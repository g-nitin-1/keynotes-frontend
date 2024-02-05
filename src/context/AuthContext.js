import React, { useEffect, useState } from "react";
import { useContext } from "react";
import {auth} from "../firebase";
import { createUserWithEmailAndPassword,onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthContext = React.createContext();


export function useAuth(){
    return useContext(AuthContext);
}


export function AuthProvider({children}){
    const [currentUser,setCurrentUser]=useState("");

    function signUp(email,password){
        return createUserWithEmailAndPassword(auth,email,password);
    }

    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password);
    }

    function logout(){
        return signOut(auth);
    }

    function checkCurrentUser(){
        return auth.currentUser.email;
    }

    function checkAuth(){
        return currentUser?true:false;
    }
    
    function resetPassword(email){
        return sendPasswordResetEmail(auth,email);
    }

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })

        return unsubscribe;
    },[]);


    const value = {
        currentUser,
        signUp,
        login,
        logout,
        checkAuth,
        resetPassword,
        checkCurrentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}