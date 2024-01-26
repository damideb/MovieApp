import React,{useRef, useState} from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import MovieImage from "./components/MovieImage";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import SkeletonCard from "./components/skeletonCard";


export default function Movie(){

    const[allMovies, setallMovies] = useState([])
    const[selectedMovie, setSelectedMovie] = useState({})
    const[inputValue, setInputValue] =useState("")
    const[user, setUser] = useState("")
    const [open, setOpen] = useState(true)
    const [loading, setLoading] = useState(true)
   
    const key = process.env.REACT_APP_API_KEY

    const firstRender= useRef(true)

    const fetchMovie = async()=>{
        
        try{
            const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&page=1`)
            const data= await res.json()
            setallMovies(data.results)
            setSelectedMovie(data.results[0])
        }
        catch(error){
            console.log(error)
        }
        finally{
            setLoading(false)
        }
       
    }
    const Auth= auth

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

    React.useEffect(()=>{
        onAuthStateChanged(Auth, user=>{
            if(user) {
                localStorage.setItem("signedIn", "true")
                setUser(user.displayName)}
            else{
                localStorage.removeItem('signedIn')
                setUser(null)
            }
        })
    }, [Auth])


    React.useEffect(() => {

        if (firstRender.current && inputValue==="") {
            fetchMovie()
        } 
     
    }, [inputValue])

  

    const signedIn = localStorage.getItem('signedIn')
    const userUi = signedIn? `Hi ${user}`:  <Link to="/login"> Log In</Link>

    const userSignOut = async()=>{
        await signOut(auth)
        setOpen(false)
    }


    return loading? <SkeletonCard cards={12}/> : (
        <>
            <h1 className="title">Movie App</h1>
            <div className="icons">
                <div className="profile">
                    <div className="LogoutProfile">
                            <FaRegCircleUser
                                className="profileIcon"
                                onMouseEnter={()=>setOpen(true)}
                            />
                            {(open && user) && <ul>
                                <li className="logout">
                                    <h2 onClick={userSignOut}>LogOut</h2>
                                </li>
                            </ul>}
                    </div>
                    <h2 className="loginLink">
                            {userUi}
                     </h2>
                </div>
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