import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import movieService from '../services/movieService'

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const movieData = await movieService.getMovieById(id);
        setMovie(movieData);
      } catch (err) {
        setError('Failed to fetch movie details');
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  const handleBack = () => {
    navigate('/home');
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-zinc-900'>
        <Navbar />
        <div className='flex items-center justify-center py-20'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600 mb-4 mx-auto'></div>
            <span className='text-white text-xl'>Loading movie details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className='min-h-screen bg-zinc-900'>
        <Navbar />
        <div className='flex items-center justify-center py-20'>
          <div className='text-center'>
            <p className='text-red-400 text-xl mb-4'>{error || 'Movie not found'}</p>
            <button 
              onClick={handleBack}
              className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200'
            >
              Back to Movies
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-zinc-900'>
      <Navbar />
      
      {/* Movie Detail Content */}
      <div className='pt-20 pb-8 px-8'>
        <div className='max-w-6xl mx-auto'>
          {/* Back Button */}
          <button 
            onClick={handleBack}
            className='mb-8 flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-200'
          >
            <svg className='w-6 h-6 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
            </svg>
            Back to Movies
          </button>

          {/* Movie Details Card */}
          <div className='bg-gray-800 rounded-2xl shadow-2xl overflow-hidden'>
            <div className='flex flex-col lg:flex-row'>
              {/* Movie Poster */}
              <div className='lg:w-1/3 bg-gray-700 flex items-center justify-center p-8'>
                <img 
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'} 
                  alt={movie.Title}
                  className='w-full max-w-sm rounded-lg shadow-xl'
                />
              </div>

              {/* Movie Information */}
              <div className='lg:w-2/3 p-8'>
                <div className='mb-6'>
                  <h1 className='text-4xl font-bold text-white mb-2'>{movie.Title}</h1>
                  <div className='flex items-center gap-4 text-gray-300 mb-4'>
                    <span className='bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold'>
                      {movie.Year}
                    </span>
                    <span className='bg-gray-700 text-white px-3 py-1 rounded-full text-sm'>
                      {movie.Rated}
                    </span>
                    <span className='bg-gray-700 text-white px-3 py-1 rounded-full text-sm'>
                      {movie.Runtime}
                    </span>
                  </div>
                </div>

                {/* Plot */}
                <div className='mb-6'>
                  <h3 className='text-xl font-semibold text-white mb-3'>Plot</h3>
                  <p className='text-gray-300 leading-relaxed text-lg'>
                    {movie.Plot !== 'N/A' ? movie.Plot : 'No plot available.'}
                  </p>
                </div>

                {/* Movie Details Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                  <div>
                    <h4 className='text-lg font-semibold text-purple-400 mb-2'>Director</h4>
                    <p className='text-gray-300'>{movie.Director !== 'N/A' ? movie.Director : 'Unknown'}</p>
                  </div>
                  <div>
                    <h4 className='text-lg font-semibold text-purple-400 mb-2'>Genre</h4>
                    <p className='text-gray-300'>{movie.Genre !== 'N/A' ? movie.Genre : 'Unknown'}</p>
                  </div>
                  <div>
                    <h4 className='text-lg font-semibold text-purple-400 mb-2'>Cast</h4>
                    <p className='text-gray-300'>{movie.Actors !== 'N/A' ? movie.Actors : 'Unknown'}</p>
                  </div>
                  <div>
                    <h4 className='text-lg font-semibold text-purple-400 mb-2'>Language</h4>
                    <p className='text-gray-300'>{movie.Language !== 'N/A' ? movie.Language : 'Unknown'}</p>
                  </div>
                </div>

                {/* Ratings */}
                {movie.Ratings && movie.Ratings.length > 0 && (
                  <div className='mb-6'>
                    <h4 className='text-lg font-semibold text-purple-400 mb-3'>Ratings</h4>
                    <div className='flex flex-wrap gap-4'>
                      {movie.Ratings.map((rating, index) => (
                        <div key={index} className='bg-gray-700 rounded-lg p-3'>
                          <p className='text-yellow-400 font-semibold'>{rating.Source}</p>
                          <p className='text-white text-xl font-bold'>{rating.Value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* IMDB Rating */}
                {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                  <div className='mb-6'>
                    <div className='bg-yellow-600 rounded-lg p-4 inline-block'>
                      <div className='flex items-center'>
                        <span className='text-2xl font-bold text-white mr-2'>⭐</span>
                        <div>
                          <p className='text-white font-semibold'>IMDb Rating</p>
                          <p className='text-white text-2xl font-bold'>{movie.imdbRating}/10</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className='flex gap-4 mt-8'>
                  <button className='bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg'>
                    Watch Trailer
                  </button>
                  <button className='border-2 border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105'>
                    Add to Watchlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail