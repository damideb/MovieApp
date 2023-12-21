import React,{useRef, useState} from "react";
import MovieImage from "./MovieImage";

export default function Movie(){

    const[allMovies, setallMovies] = useState( [])
    const[selectedMovie, setSelectedMovie] = useState({})
    const[inputValue, setInputValue] =useState("")
    const key = process.env.REACT_APP_API_KEY


    const firstRender= useRef(true)

    const fetchMovie = async()=>{
        const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US`)
        const data= await res.json()
        setallMovies(data.results)
        setSelectedMovie(data.results[0])
    }

    console.log(allMovies[0])
    const searhMovies= async (e)=>{
        e.preventDefault()
        if (inputValue){
            try{
                const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&
                language=en-US&query=${inputValue}&page=1&include_adult=false`)
                const data = await res.json()
            setallMovies(data.results)
            
            }
            catch (error){
            console.log(error)
            }
        }
       
    }


    
    React.useEffect(() => {
        if (firstRender.current) {
            fetchMovie()
            
        } 
       

    }, [])


  
    
    return(
        <>
         <h1 className="title">Movie App</h1>
         <form className="form" onSubmit={searhMovies}>
            <label className="label" htmlFor="query"></label>
                <input type="text" className="input" name="query" placeholder="i.e. Little Mermaid"
                value={inputValue}
                onChange={(e)=>{
                    setInputValue(e.target.value)
                }}/>
                <button type="submit" className="button">Search Movie</button>
            </form>
                    <div className="hero" style={{background: `url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})`}}>
                        <div className="selected">
                        <h1 className="selected-title">{selectedMovie.title}</h1>
                <p className="selected-overview">{selectedMovie.overview}</p>
                        </div>

                {/* <img
                src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${selectedMovie.poster_path}`}
                alt=""/> */}
            </div>
        
        <div className="all-container">
            <div className="all-card-list">
            {
                allMovies.filter(movie=> movie.poster_path).map((movie, index)=>{
                 return  <MovieImage key={movie.id}
                            movie={movie}
                            setmovie= {setSelectedMovie}
                            />
                })
            }
</div>
        </div>
        </>
    )
}