import React,{useRef, useState} from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import MovieImage from "./MovieImage";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Movie(){

    const[allMovies, setallMovies] = useState([])
    const[selectedMovie, setSelectedMovie] = useState({})
    const[inputValue, setInputValue] =useState("")
    const[user, setUser] = useState("")
   
    const key = process.env.REACT_APP_API_KEY

    const firstRender= useRef(true)

    const fetchMovie = async()=>{
        
        try{
            const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US`)
            const data= await res.json()
            setallMovies(data.results)
            setSelectedMovie(data.results[0])
        }
        catch(error){
            console.log(error)
        }
       
    }


    const searhMovies= async (e)=>{
        e.preventDefault()
        if (inputValue){
            try{
                const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&
                language=en-US&query=${inputValue}&page=2&include_adult=false`)
                const data = await res.json()
                const results = data.results
                if(results.length) setallMovies(results)
            }
            catch (error){
            console.log(error)
            }
        } 
    }


    React.useEffect(() => {
        if (firstRender.current && inputValue==="") {
            fetchMovie()
        } 
       return()=>{
        firstRender.current= false
       }
    }, [inputValue])

    React.useEffect(()=>{
        onAuthStateChanged(auth, user=>{
            if(user) setUser(user.displayName)
            else{
                setUser(null)
            }
        })
    }, [])


    const userUi = user? `Hi, ${user}`:  <Link to="/login"> Log In</Link>

    const userSignOut = async()=>{
        await signOut(auth)
    }

    const styles= {
        fontSize: '5rem',
        width:"100%",
        margin:"0 0.3em",
        color:"#ddd",
        cursor:"pointer", 
    }

    return(
        <>
            <h1 className="title">Movie App</h1>
            <div className="icons">
                <div className="LogoutProfile">
                    <FaRegCircleUser style={styles}/>
                    <ul>
                        <li className="logout">
                            <h2 onClick={userSignOut}>LogOut</h2>
                        </li>
                    </ul>
                    </div>
                <h2 className="loginLink">
                    {userUi}
                </h2>
                <form onSubmit={searhMovies}>
                    <input type="search" className="input" name="query" placeholder="i.e. Little Mermaid"
                    value={inputValue}
                    onChange={(e)=>{
                        setInputValue(e.target.value)
                    }}/>
                        <button className="button" type="submit">Search Movie</button>
                </form>
                     
            </div>
              <div className="hero" style={{background: `url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})`}}>
                            <div className="selected">
                            <h1 className="selected-title">{selectedMovie.title}</h1>
                    <p className="selected-overview">{selectedMovie.overview}</p>
                            </div>

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