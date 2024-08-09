import React,{useRef, useState, useEffect} from "react";
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
import { Swiper,SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';


export default function Movie(){

    const[allMovies, setallMovies] = useState([])
    const[selectedMovie, setSelectedMovie] = useState({})
    const[inputValue, setInputValue] =useState("")
    const[user, setUser] = useState("")
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [shows, setShows] = useState([])
    const [topRated, setTopRated] = useState([])
    const [showIcon, setShowIcon] = useState({})
    const [openSearch, setOpenSearch] = useState(false)

    const key = process.env.REACT_APP_API_KEY

    const firstRender= useRef(true)
    const searchRef =  useRef(null)

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

    const searhMovies= async (val)=>{
        if (val){
            setInputValue(val)
            try{
                const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&
                language=en-US&query=${val}&page=2&include_adult=false`)
                const data = await res.json()
                const results = data.results
                if(results.length) setallMovies(results)
            }
            catch (error){
            console.log(error)
            }
        } 
        else{
            setInputValue('')
        }
    }

    const handleOutsideClick =(e)=>{
        if(searchRef.current && !searchRef.current.contains(e.target)){
            setOpenSearch(false)
        }
    }

   useEffect(()=>{
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


   useEffect(() => {
    firstRender.current=true
        if (firstRender.current && inputValue==="") {
            fetchMovie()
        } 

        return () => {
          firstRender.current=false
          };
     
    }, [inputValue])

    useEffect(()=>{
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
    })

  
    const signedIn = localStorage.getItem('signedIn')
    const userUi = signedIn? `Hi ${user}`:  <Link to="/login"> Log In</Link>

    const userSignOut = async()=>{
        await signOut(auth)
        setOpen(false)
    }

    const showtoggleIcon = (id)=>{
        setShowIcon({
            ...showIcon,
            [id]: true
        })
    }

    const hideIcon= (id)=>{
        setShowIcon({
            ...showIcon,
            [id]: false
        })
    }

    return loading? <SkeletonCard cards={12}/> : (
        <>
           
            <div className="icons">
                <h1 className="title">MovieApp</h1>
                <div className="searchProfile-container">
                    <form  ref={searchRef}>
                        {openSearch && <input type="search" className="input"  placeholder="i.e. Little Mermaid"
                                value={inputValue}
                                onChange={(e)=>{
                                    searhMovies(e.target.value)
                                }}/>}
                            <CiSearch className={openSearch? "searchIconClose" :"searchIcon"}  onClick={()=>setOpenSearch(true)}/>
                                    {/* <button className="button" type="submit">Search Movie</button> */} 
                    </form>
                    <div className="profile">
                                <div className="LogoutProfile">
                                    <Avatar 
                                        onMouseEnter={()=>setOpen(true)}
                                        variant="square"
                                        sx={{ bgcolor: 'gray', color:'black', width:{xs: '2em', lg:'2.2em'}, height:'1.5em', fontSize:{xs:'2.5em', lg:'3em'}, marginTop:'0.2em'}}
                                        className="profileIcon">{signedIn && user.charAt(0).toUpperCase()}</Avatar>
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
                        <div className="swiperParent" onMouseOver={()=>showtoggleIcon(1)} onMouseOut={()=>hideIcon(1)} >
                            <div  className="swiper-button-prev-unique" id={!showIcon[1]? 'hide' : "" }><RiArrowLeftSLine /></div>
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={20}
                                slidesPerView={4.3}
                                slidesPerGroup={4}
                                navigation={ 
                                    {nextEl: '.swiper-button-next-unique',
                                prevEl: '.swiper-button-prev-unique'}}
                                onSwiper={(swiper) => console.log(swiper)}
                                onSlideChange={() => console.log('slide change')}
                                breakpoints={{
                                    0:{
                                        slidesPerView: 2.9,
                                        spaceBetween: 13,
                                        slidesPerGroup:2
                                    },
                                    520:{
                                        slidesPerView: 2.6,
                                        spaceBetween: 10,
                                        slidesPerGroup:3
                                    },
                                    675: {
                                      slidesPerView: 2.5,
                                      spaceBetween: 15,
                                      slidesPerGroup:3
                                    },
                                    768: {
                                      slidesPerView: 2.7,
                                      spaceBetween: 15,
                                      slidesPerGroup:3
                                    },
                                    1024: {
                                      slidesPerView: 4.3,
                                      spaceBetween: 17,
                                    },
                                    1200: {
                                        slidesPerView: 4.3,
                                        spaceBetween: 10
                                      },
                                  }}
                                 
                            >
                            
                                {/* <div className="all-card-list" ref={sliderRef} >  */}
                                {
                                    allMovies.filter(movie=> movie.poster_path).map((movie, index)=>{
                                    return <SwiperSlide><MovieImage key={movie.id}
                                                movie={movie}
                                                setmovie= {setSelectedMovie}
                                                />
                                                </SwiperSlide>
                                        
                                    })
                                }
                                {/* </div>  */}
                            </Swiper>
                            <div className="swiper-button-next-unique" id={!showIcon[1]? 'hide' : "" }> <RiArrowRightSLine  /></div>
                    </div>
                    </div>

                    <div>
                        <h1 className="movieHeading">TV Shows</h1>
                        <div className="swiperParent"  onMouseOver={()=>showtoggleIcon(2)} onMouseOut={()=>hideIcon(2)} >
                            <div  className="swiper-button-prev-unique1" id={!showIcon[2]? 'hide' : "" }><RiArrowLeftSLine /></div>
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={20}
                                slidesPerView={4.3}
                                slidesPerGroup={4}
                                navigation={ 
                                {nextEl: '.swiper-button-next-unique1',
                                prevEl: '.swiper-button-prev-unique1'}}
                                onSwiper={(swiper) => console.log(swiper)}
                                onSlideChange={() => console.log('slide change')}
                                breakpoints={{
                                    0:{
                                        slidesPerView: 2.9,
                                        spaceBetween: 13,
                                        slidesPerGroup:2
                                    },
                                    520:{
                                        slidesPerView: 2.6,
                                        spaceBetween: 10,
                                        slidesPerGroup:3
                                    },
                                    675: {
                                      slidesPerView: 2.5,
                                      spaceBetween: 15,
                                      slidesPerGroup:3
                                    },
                                    768: {
                                      slidesPerView: 2.5,
                                      spaceBetween: 30,
                                      slidesPerGroup:3
                                    },
                                    1024: {
                                      slidesPerView: 4.3,
                                      spaceBetween: 17,
                                    },
                                    1200: {
                                        slidesPerView: 4.3,
                                        spaceBetween: 10
                                      },
                                  }}
                            >
                   
                                {
                                    shows.filter(show=> show.poster_path).map((show, index)=>{
                                    return <SwiperSlide> <TvShows key={show.id}
                                                show={show}
                                                />
                                                </SwiperSlide>
                                    })
                                }
                      
                            </Swiper>
                            <div className="swiper-button-next-unique1" id={!showIcon[2]? 'hide' : "" } > <RiArrowRightSLine  /></div>
                        </div> 
                    </div>

                    <div>
                        <h1 className="movieHeading">Top Rated</h1>
                        <div className="swiperParent"  onMouseOver={()=>showtoggleIcon(3)} onMouseOut={()=>hideIcon(3)}>
                            <div  className="swiper-button-prev-unique2" id={!showIcon[3]? 'hide' : "" }><RiArrowLeftSLine /></div>
                                <Swiper
                                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                                    spaceBetween={15}
                                    slidesPerView={4.3}
                                    slidesPerGroup={4}
                                    navigation={ 
                                        {nextEl: '.swiper-button-next-unique2',
                                    prevEl: '.swiper-button-prev-unique2'}}
                                    onSwiper={(swiper) => console.log(swiper)}
                                    onSlideChange={() => console.log('slide change')}
                                    breakpoints={{
                                        0:{
                                            slidesPerView: 2.9,
                                        spaceBetween: 13,
                                        slidesPerGroup:2
                                        },
                                        520:{
                                            slidesPerView: 2.6,
                                            spaceBetween: 10,
                                            slidesPerGroup:3
                                        },
                                        675: {
                                          slidesPerView: 2.5,
                                          spaceBetween: 15,
                                          slidesPerGroup:3
                                        },
                                        768: {
                                          slidesPerView: 2.5,
                                          spaceBetween: 30,
                                          slidesPerGroup:3
                                        },
                                        1024: {
                                          slidesPerView: 4.3,
                                          spaceBetween: 17,
                                        },
                                        1200: {
                                            slidesPerView: 4.3,
                                        spaceBetween: 10
                                          },
                                      }}
                                >
                            
                     
                                    {
                                    topRated.filter(show=> show.poster_path).map((show, index)=>{
                                        return  <SwiperSlide><TopRated key={show.id}
                                                    show={show}
                                                    />
                                                    </SwiperSlide>
                                        })
                                    }
                        
                            </Swiper>
                            <div className="swiper-button-next-unique2" id={!showIcon[3]? 'hide' : "" } > <RiArrowRightSLine  /></div>
                        </div>
                    </div>
                </div>
        </>
    )
}