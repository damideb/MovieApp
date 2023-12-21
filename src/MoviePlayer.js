import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import YouTube from 'react-youtube'


export default function MoviePlayer() {

  const [trailerMovie, setTrailerMovie] = useState({})

  const {movieId} = (useParams())
  const parseMovie = parseInt(movieId)

  

  const fetchTrailer =  async(id)=>{
    const res = await fetch (`https://api.themoviedb.org/3/movie/${id}?api_key=2ee7df5e9a9849bfb5f047bbde626697&append_to_response=videos`)
    const data = await res.json()
    const trailer=  data.videos.results.find(trailer=> trailer.name==='Official Trailer')
  
    setTrailerMovie(trailer ? trailer : data.videos.results[0])
   
  }
 
  useEffect(()=>{
    fetchTrailer(parseMovie)
  },[parseMovie])



  return (
    <div>
      <YouTube
        videoId={trailerMovie.key}
      
      />
    </div>
  )
}
