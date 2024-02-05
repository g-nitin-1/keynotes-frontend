import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function Rootlayout(){
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Rootlayout;