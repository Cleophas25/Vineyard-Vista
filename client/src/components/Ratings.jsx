import React from 'react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FaStar, FaStarAndCrescent, FaStarHalfAlt } from "react-icons/fa";
const Ratings = ({ rating, numReviews }) => {
  return (
    <div className='flex gap-1 items-center'>
      {rating > 1 ? (
        <BsStarFill className='text-yellow-500 text-sm' />
      ) : rating >= 0.5 ? (
        <BsStarHalf className='text-yellow-500 text-sm' />
      ) : (
        <BsStar className='text-yellow-500 text-sm' />
      )}
      {rating > 2 ? (
        <BsStarFill className='text-yellow-500 text-sm' />
      ) : rating >= 1.5 ? (
        <BsStarHalf className='text-yellow-500 text-sm' />
      ) : (
        <BsStar className='text-yellow-500 text-sm' />
      )}
      {rating > 3 ? (
        <BsStarFill className='text-yellow-500 text-sm' />
      ) : rating >= 2.5 ? (
        <BsStarHalf className='text-yellow-500 text-sm' />
      ) : (
        <BsStar className='text-yellow-500 text-sm' />
      )}
      {rating > 4 ? (
        <BsStarFill className='text-yellow-500 text-sm' />
      ) : rating >= 3.5 ? (
        <BsStarHalf className='text-yellow-500 text-sm' />
      ) : (
        <BsStar className='text-yellow-500 text-sm' />
      )}
      {rating > 5 ? (
        <BsStarFill className='text-yellow-500 text-sm' />
      ) : rating >= 4.5 ? (
        <BsStarHalf className='text-yellow-500 text-sm' />
      ) : (
        <BsStar className='text-yellow-500 text-sm' />
      )}

      
    </div>
  );
}

export default Ratings
