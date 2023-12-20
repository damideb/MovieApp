import React from 'react'
import { useParams } from 'react-router-dom'
import YouTube from 'react-youtube'

export default function MoviePlayer() {

  const movieId = useParams()
console.log(movieId)
  return (
    <div>
      <YouTube/>
    </div>
  )
}
