import React from 'react'
import { Link } from 'react-router-dom'

export default function MovieImage({movie, setmovie}) {
    
    const enter=(movie)=>{
        setmovie(movie)
    }
    
    return (
         <div className="all-card">
            <Link to={`/${movie.id}`}>
                <div className='img-div'>
                <img className="all-card--image"
                    onMouseOver={()=>enter(movie)}
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt={movie.title + ' poster'}
                        />
                </div>
              
            </Link>   
            <div className="all-card--content">
                <h3 className="all-card--title">{movie.title}</h3>
            </div>
        </div>
    )
}
