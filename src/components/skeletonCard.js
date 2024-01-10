import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';


export default function SkeletonCard({cards}) {

  const skeletonNumber = Array(cards).fill(1).map((val,index)=>{
  
  return <Skeleton key={index}  width={300} height={300} className='all-card-list' />
  })

  return(
    <div>
      <div> <Skeleton circle width={40} height={40}/> </div>
      <div><Skeleton className="hero"/></div>
    
        <div className='all-container' > 
          <div className='all-skeleton' >
              {skeletonNumber}           
          </div>
        
      </div>  
    </div>
  )
}
