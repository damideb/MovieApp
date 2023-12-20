import React from "react";
import {Routes,Route} from 'react-router-dom'
import Movie from "./movie";
import MoviePlayer from "./MoviePlayer";

export default function App(){

    return(
        <div >
        <Routes>
            <Route  path='/'element={<Movie />} />
            <Route  path="/:movieId" element={<MoviePlayer />} />
        </Routes>
    </div>
    )
}