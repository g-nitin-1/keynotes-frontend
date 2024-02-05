import React from "react";
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Notes from "./Notes";
import { useAuth } from "../context/AuthContext";



export default function PrivateRoutes({element:Element,...rest}){
    let {currentUser,checkAuth} = useAuth();
    return ( checkAuth() ? <Notes /> : '');
}