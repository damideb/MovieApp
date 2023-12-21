import React, {useRef, useState} from 'react'


export default function useData() {


    const[allMovies, setallMovies] = useState( [])
    const[selectedMovie, setSelectedMovie] = useState({})
    const key = process.env.REACT_APP_API_KEY


    const firstRender= useRef(true)

    const fetchMovie = async()=>{
        const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US`)
        const data= await res.json()
        setallMovies(data.results)
        setSelectedMovie(data.results[0])
    }


    
    React.useEffect(() => {
        if (firstRender.current) {
            fetchMovie()
        } 
       

    }, [])

    return[allMovies, selectedMovie]
}
