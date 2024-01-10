import React from "react";
import {Routes,Route} from 'react-router-dom'
import Movie from "./movie";
import MoviePlayer from "./pages/MoviePlayer";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AuthRequired from "./pages/authRequired";
import { SkeletonTheme } from 'react-loading-skeleton';


export default function App(){

    return(
    <div>
        <SkeletonTheme baseColor="#313131" highlightColor="#525252">
            <Routes>
                <Route  path='/'element={<Movie />} />
                <Route element={<AuthRequired/>}>
                    <Route  path="/:movieId" element={<MoviePlayer />} />
                </Route>
                <Route  path="/login" element={<Login/> }/>
                <Route  path="/signup"  element={<Signup/>}/>
            </Routes>
        </SkeletonTheme>
    </div>
    )
}