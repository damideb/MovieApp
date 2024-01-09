import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";

export default function AuthRequired() {

    const user = auth.currentUser
    const location = useLocation()

 if(!user){
    return (  <Navigate
        to='/login'
        state={{
            message: "You must be logged in to view this trailer",
            from:  location.pathname
        }}
        replace/>
    )
 }

 return <Outlet/>
   
}
