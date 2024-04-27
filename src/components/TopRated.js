import React from 'react'
import { Link } from 'react-router-dom'

export default function TopRated({show}) {


  return (
    <div className="all-card">
    <Link to={`/${show.id}`}>
        <div className='img-div'>
        <img className="all-card--image"
                src={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
                alt={show.title + ' poster'}
                />
        </div>
      
    </Link>   
    <div className="all-card--content">
        <h3 className="all-card--title">{show.title}</h3>
    </div>
</div>
  )
}
