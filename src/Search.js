import React, {useState,useRef} from "react";
import MovieCard from "./MovieCard";

export default function Search(){

const[inputValue, setInputValue] =useState("")
const[movies, setMovies] = useState( [])
const[errorText, setErrorText]=useState("")
const key = process.env.REACT_APP_API_KEY

const firstRender= useRef(true)



React.useEffect(() => {
    if (firstRender.current) {
        firstRender.current = false
        return;
    } 
   
    return ()=>{
        if(!firstRender.current && movies.length===0 ) {
            setErrorText('Movie not found')
        }
    }
}, [movies])

const searhMovies= async (e)=>{
    e.preventDefault()
try{
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&
    language=en-US&query=${inputValue}&page=1&include_adult=false`)
    const data = await res.json()
   setMovies(data.results)
   
}
catch (error){
console.log(error)
}


}
    return(
        <div className="container">
            <form className="form" onSubmit={searhMovies}>
            <label className="label" htmlFor="query"></label>
                <input type="text" className="input" name="query" placeholder="i.e. Little Mermaid"
                value={inputValue}
                onChange={(e)=>{
                    setInputValue(e.target.value)
                }}/>
                <button type="submit" className="button">Search Movie</button>
            </form>
            <div className="card-list">
            {
                movies.filter(movie=> movie.poster_path).map((movie, index)=>{
                 return  <MovieCard key={movie.id}>
                    {movie}
                    </MovieCard>
                })
            }
            { movies.length? "" : <div>{errorText}</div>}
</div>
        </div>
    )
}