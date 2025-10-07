import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import movieService from '../services/movieService';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const popularMovies = await movieService.getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className='min-h-screen bg-zinc-900'>
        <Navbar />
        
        {/* Movies Section */}
        <div className='pt-20 pb-8 px-8'>
          <div className='max-w-7xl mx-auto'>
            <h2 className='text-4xl font-bold text-white mb-8 px-4 text-center'>
              Popular Movies
            </h2>
            
            {loading && (
              <div className='flex justify-center items-center py-20'>
                <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600'></div>
                <span className='text-white text-xl ml-4'>Loading amazing movies...</span>
              </div>
            )}

            {error && (
              <div className='text-center py-20'>
                <p className='text-red-400 text-xl mb-4'>{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200'
                >
                  Try Again
                </button>
              </div>
            )}

            {!loading && !error && movies.length > 0 && (
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 px-4'>
                {movies.map((movie, index) => (
                  <div 
                    key={movie.imdbID || index}
                    className='animate-fade-in'
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
            )}

            {!loading && !error && movies.length === 0 && (
              <div className='text-center py-20'>
                <p className='text-gray-400 text-xl'>No movies found. Please try again later.</p>
              </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default Home;