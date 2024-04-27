import React,{useRef, useState} from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import MovieImage from "./components/MovieImage";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import SkeletonCard from "./components/skeletonCard";
import TvShows from "./components/TvShows";
import TopRated from "./components/TopRated";
import { CiSearch } from "react-icons/ci";
import Avatar from '@mui/material/Avatar';
import { RiArrowRightSLine, RiArrowLeftSLine  } from "react-icons/ri";


export default function Movie(){

    const[allMovies, setallMovies] = useState([])
    const[selectedMovie, setSelectedMovie] = useState({})
    const[inputValue, setInputValue] =useState("")
    const[user, setUser] = useState("")
    const [open, setOpen] = useState(true)
    const [loading, setLoading] = useState(true)
    const [shows, setShows] = useState([])
    const [topRated, setTopRated] = useState([])
    const [showIcon, setShowIcon] = useState(false)
   
    const key = process.env.REACT_APP_API_KEY

    const firstRender= useRef(true)

    const fetchMovie = async()=>{
        
        try{
            const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&page=1`)
            const res2 = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${key}&language=en-US&page=1`)
            const res3 = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=${key}&page=1`)
            const data= await res.json()
            const data2 = await res2.json()
            const data3 =await res3.json()
            setallMovies(data.results)
            setShows(data2.results)
            setTopRated(data3.results)
            setSelectedMovie(data2.results[0])
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
           
            <div className="icons">
                <h1 className="title">Movie App</h1>
                <div className="searchProfile-container">
                <form onSubmit={searhMovies}>
                    <CiSearch className="searchIcon"/>
                        {/* <input type="search" className="input" name="query" placeholder="i.e. Little Mermaid"
                        value={inputValue}
                        onChange={(e)=>{
                            setInputValue(e.target.value)
                        }}/>
                            <button className="button" type="submit">Search Movie</button> */}
                    </form>
                    {/* {user?  
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
                               } */}
                    <div className="profile">
                        <div className="LogoutProfile">
                              { user? <Avatar 
                                variant="square"
                                sx={{ bgcolor: 'gray', color:'black', width:'2.5em', height:'1.5em', fontSize:"3rem", marginTop:'0.2em' }}
                                className="profileIcon">{user.charAt(0).toUpperCase()}</Avatar>: <FaRegCircleUser
                                    className="profileIcon"
                                    onMouseEnter={()=>setOpen(true)}
                                />  }
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
                </div>      
            </div>
              <div className="hero" style={{background: `url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})`}}>
                            <div className="selected">
                            <h1 className="selected-title">{selectedMovie.title}</h1>
                    <p className="selected-overview">{selectedMovie.overview}</p>
                            </div>

                </div>
            
                <div className="all-container">
                    <div>
                        <h1 className="movieHeading">Movie</h1>
                        <div className="container" onMouseOver={()=>setShowIcon(true)} onMouseOut={()=> setShowIcon(false)}>
                        <div> <RiArrowLeftSLine  className={ showIcon? "rightIcon": "hide"}/></div>
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
                    <div> <RiArrowRightSLine className={ showIcon? "rightIcon": "hide"}/></div>
                    </div>
                    </div>

                    <div>
                        <h1 className="movieHeading">TV Shows</h1>
                        <div className="container" onMouseOver={()=>setShowIcon(true)} onMouseOut={()=> setShowIcon(false)}>
                        <div> <RiArrowLeftSLine className={ showIcon? "rightIcon": "hide"}/></div>
                        <div className="all-card-list">
                            {
                                shows.filter(show=> show.poster_path).map((show, index)=>{
                                return  <TvShows key={show.id}
                                            show={show}
                                            />
                                })
                            }
                        </div>
                        <div> <RiArrowRightSLine className={ showIcon? "rightIcon": "hide"}/></div>
                        </div>
                    </div>

                    <div>
                        <h1 className="movieHeading">Top Rated</h1>
                        <div className="container" onMouseOver={()=>setShowIcon(true)} onMouseOut={()=> setShowIcon(false)}>
                        <div> <RiArrowLeftSLine  className={ showIcon? "rightIcon": "hide"}/></div>
                        <div className="all-card-list">
                            {
                               topRated.filter(show=> show.poster_path).map((show, index)=>{
                                return  <TopRated key={show.id}
                                            show={show}
                                            />
                                })
                            }
                            </div>
                            <div> <RiArrowRightSLine  className={ showIcon? "rightIcon": "hide"}/></div>
                        </div>
                    </div>
            </div>
        </>
    )
}