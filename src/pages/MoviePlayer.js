import React,{useState, useEffect} from 'react'
import { useParams} from 'react-router-dom'
import YouTube from 'react-youtube';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function MoviePlayer() {

    const [trailerMovie, setTrailerMovie] = useState({})
    const [movieDetails, setMovieDetails] = useState({})
    const [loadingg, setLoadingg]= useState(true)

    const {movieId} = (useParams())
    const parseMovie = parseInt(movieId)


    const loadingVal = async ()=>{
        setLoadingg(false)
    }
    

    const fetchTrailer =  async(id)=>{
      const res = await fetch (`https://api.themoviedb.org/3/movie/${id}?api_key=2ee7df5e9a9849bfb5f047bbde626697&append_to_response=videos`)
      const data = await res.json()
      const trailer=  data.videos.results.find(trailer=> trailer.name==='Official Trailer')
      setTrailerMovie(trailer? trailer : null)
      setMovieDetails(data)
    await loadingVal()
    }


    useEffect(()=>{
      fetchTrailer(parseMovie)
    },[parseMovie])


  return loadingg? <Skeleton className='skeletonPlayer' height={300} width={900}/>: (
      <>
        <div className='videoPlayer'>
          {
            trailerMovie?
            <div>
                <h3 className="card--title">{movieDetails.title}</h3>
                <YouTube
                    videoId={trailerMovie.key}
                    
                    className='youtube'
                    opts={{
                      width:"90%" 
                    }}
                /> 
                <div className="card">
                  <p><small>RELEASE DATE: {movieDetails.release_date}</small></p>
                  <p><small>RATING: {movieDetails.vote_average}</small></p>
                  <p className="card--desc">{movieDetails.overview}</p>
                </div>
            </div>
            : 
            <h1>{`The Official Trailer for ${movieDetails.title} is not availabe`}</h1>
          }
        </div>
      </>
  )
}
