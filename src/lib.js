const fetchMovie = async()=>{
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US`)
    const data= await res.json()
}