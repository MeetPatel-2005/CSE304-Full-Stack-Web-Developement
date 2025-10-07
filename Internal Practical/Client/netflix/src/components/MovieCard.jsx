import React from 'react'
import { useNavigate } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/movie/${movie.imdbID}`);
  };

  const handleCardClick = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className='group relative w-72 h-96 bg-zinc-900 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer'
    >
      {/* Movie Poster */}
      <div className='relative w-full h-72 overflow-hidden'>
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'} 
          alt={movie.Title}
          className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
        />
        
        {/* Gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300'></div>
        
        {/* Year badge */}
        <div className='absolute top-3 right-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-semibold'>
          {movie.Year}
        </div>
      </div>
      
      {/* Movie Details */}
      <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-zinc-900 to-transparent'>
        <h3 className='text-white font-bold text-lg mb-1 line-clamp-2 group-hover:text-purple-400 transition-colors duration-300'>
          {movie.Title}
        </h3>
        
        <div className='flex items-center justify-between text-sm text-gray-300'>
          <span className='capitalize bg-zinc-800 px-2 py-1 rounded text-xs'>
            {movie.Type}
          </span>
          
          {/* IMDB ID indicator */}
          <span className='text-yellow-400 text-xs'>
             IMDB
          </span>
        </div>
      </div>
      
      {/* Hover overlay with additional info */}
      <div className='absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
        <div className='text-center p-4'>
          <h4 className='text-white font-bold text-xl mb-2'>{movie.Title}</h4>
          <p className='text-gray-300 mb-3'>Released: {movie.Year}</p>
          <button 
            onClick={handleViewDetails}
            className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-200 transform hover:scale-105'
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieCard