import React from 'react'
import { Link } from 'react-router-dom'
import image from "../../assets/Pictures/no-image.png";


const Card = ({item}) => {
  return (
    <>

    <div className='w-60 h-56 bg-white rounded-md overflow-hidden '>
         <img className='w-full object-cover h-32' src={item.backdrop_path ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`: image }/>
         <p className='capitalize font-semibold text-lg text-start px-2'>{item.title || item.original_title || item.name}</p>
         <p className='text-center text-xs'>{ item.overview ? item.overview.slice(0,70) : "not available"} <Link className="text-blue-500">...more</Link></p>
    </div>
    </>
  )
}

export default Card