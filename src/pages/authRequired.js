import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

export default function AuthRequired() {

    const user = localStorage.getItem('signedIn')
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
