import React, { useState } from "react";
import { Route,RouterProvider, createBrowserRouter, createRoutesFromElements, redirect,Navigate } from "react-router-dom";
import Notes from "./Notes";
import Home from "./Home" ;
import Rootlayout from "./Rootlayout";
import Login from "./Login";
import Signin from "./Signin";
import Forgotpassword from "./Forgotpassword";
import { AuthProvider,useAuth } from "../context/AuthContext";
import PrivateRoutes from "./privateRoutes";




let router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Rootlayout />} >
      <Route index element={<Home />} />
      {/* <Route 
        path="notes" 
        // element={currentUser? <Notes /> : redirect("/login")} 
        element={<Notes />}
        loader={async () => {
          let data = fetch("https://keynotes-api.onrender.com/notes")
          .then((res) => res.json())
          .then((data) => data)
          .catch((err)=>{console.log(err.message);});

          return data;
        }} 
      /> */}
      <Route 
        path='notes' 
        // element={<Notes />} 
        // loader={async () => {
        //   let data = fetch("https://keynotes-api.onrender.com/notes")
        //   .then((res) => res.json())
        //   .then((data) => data)
        //   .catch((err)=>{console.log(err.message);});

        //   return data;
        // }}
        // render={(...props) => {
        //   const {currentUser,checkAuth} = useAuth();
        //   alert(currentUser);
        //   return (checkAuth() ? <Notes {...props}/> : '')
        // }} 
        element={<PrivateRoutes  />}
      /> 
      <Route path="login" element={<Login />} />
      <Route path="signin" element={<Signin />} />
      <Route path="forgotpassword" element={<Forgotpassword />} />
      <Route path="*" element={<Navigate to="login" replace />} />
    </Route>
  )
)






function App(){
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
