import React from 'react'
import { Link } from 'react-router-dom'


export default function MovieImage({movie, setmovie}) {
    const enter=(movie)=>{
        setmovie(movie)
    }
    return (
         <div className="all-card">
         <Link to={`/${movie.id}`}>
            <img className="all-card--image"
               onMouseOver={()=>enter(movie)}
                width='90%'
                src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                alt={movie.title + ' poster'}
                />
         </Link>   
            <div className="all-card--content">
                <h3 className="all-card--title">{movie.title}</h3>
            </div>
        </div>
    )
}
