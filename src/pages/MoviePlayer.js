import React,{useState, useEffect} from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import YouTube from 'react-youtube';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function MoviePlayer() {

    const [trailerMovie, setTrailerMovie] = useState({})
    const [movieDetails, setMovieDetails] = useState({})
    const [loadingg, setLoadingg]= useState(true)

    const {movieId} = (useParams())
    const parseMovie = parseInt(movieId)

    const navigate = useNavigate()
    const key = process.env.REACT_APP_API_KEY


    const loadingVal = async ()=>{
        setLoadingg(false)
    }
    

    const fetchTrailer =  async(id)=>{
      const res = await fetch (`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&append_to_response=videos`)
      try{
        const data = await res.json()
        const video = data.videos.results
        const trailer=  video.find(trailer=> trailer.name==='Official Trailer')
        console.log(data.videos.results)
        setTrailerMovie(trailer? trailer : video[0])
        setMovieDetails(data)
      await loadingVal()
      }
      catch(error){
        console.log(error)
      }
     
    }

    useEffect(()=>{
      fetchTrailer(parseMovie)
    },[parseMovie])

    const back = ()=>{
      navigate(-1)
    }


  return loadingg? <Skeleton className='skeletonPlayer' height={300} width={900}/>: (
      <>
        <div className='videoPlayer'>
          <h3 onClick={back} className='back'>Go back</h3>
          {
            trailerMovie?
            <div>
                <h3 className="card--title">{movieDetails.title}</h3>
                <YouTube
                    videoId={trailerMovie.key}
                    className='youtube'
                    opts={{
                      width: '90%'
                    }}
                /> 
                
                <div className="card">
                  <p className='movieDetails'><strong>RELEASE DATE: </strong><small>{movieDetails.release_date}</small></p>
                  <p  className='movieDetails'><strong> RATING:</strong> <small> {movieDetails.vote_average}</small></p>
                  <p className="card--desc">{movieDetails.overview}</p>
                </div>
            </div>
            : 
            <h1>{`The Official Trailer for ${movieDetails.title} is not yet availabe`}</h1>
          }
        </div>
      </>
  )
}
