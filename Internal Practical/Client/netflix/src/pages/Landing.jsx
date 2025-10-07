import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import movieService from '../services/movieService'

const Landing = () => {
  const navigate = useNavigate();
  const [moviePosters, setMoviePosters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoviePosters = async () => {
      try {
        setLoading(true);
        const movies = await movieService.getPopularMovies();
        const postersWithImages = movies
          .filter(movie => movie.Poster && movie.Poster !== 'N/A')
          .map(movie => movie.Poster)
          .slice(0, 8); // Limit for better performance
        
        if (postersWithImages.length > 0) {
          setMoviePosters(postersWithImages);
        } else {
          // Use placeholder images as fallback
          setMoviePosters([
            'https://via.placeholder.com/300x450/444/fff?text=Movie+1',
            'https://via.placeholder.com/300x450/555/fff?text=Movie+2',
            'https://via.placeholder.com/300x450/666/fff?text=Movie+3',
            'https://via.placeholder.com/300x450/777/fff?text=Movie+4',
          ]);
        }
      } catch (error) {
        console.error('Error fetching movie posters:', error);
        // Use placeholder images as fallback
        setMoviePosters([
          'https://via.placeholder.com/300x450/444/fff?text=Movie+1',
          'https://via.placeholder.com/300x450/555/fff?text=Movie+2',
          'https://via.placeholder.com/300x450/666/fff?text=Movie+3',
          'https://via.placeholder.com/300x450/777/fff?text=Movie+4',
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviePosters();
  }, []);

  const handleGetMovies = () => {
    navigate('/home');
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600 mb-4 mx-auto'></div>
          <span className='text-white text-xl'>Loading movie posters...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden'>
      {/* Grid pattern overlay for texture */}
      <div className='absolute inset-0 opacity-5' style={{
        backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      <div className='relative z-10 flex h-screen'>
        {/* Left Side - Two Scrolling Columns */}
        <div className='flex flex-shrink-0'>
          {/* Left Column 1 - Scrolling Up */}
          <div className='w-48 relative overflow-hidden'>
            <div className='animate-scroll-up space-y-3 py-4'>
              {[...moviePosters, ...moviePosters, ...moviePosters].map((poster, index) => (
                <div key={`left1-${index}`} className='mx-2 rounded-lg overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105'>
                  <img 
                    src={poster} 
                    alt={`Movie ${index}`}
                    className='w-full h-56 object-cover opacity-85'
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/300x450/444/fff?text=Movie+${index + 1}`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Left Column 2 - Scrolling Down */}
          <div className='w-48 relative overflow-hidden'>
            <div className='animate-scroll-down space-y-3 py-4'>
              {[...moviePosters.slice().reverse(), ...moviePosters.slice().reverse(), ...moviePosters.slice().reverse()].map((poster, index) => (
                <div key={`left2-${index}`} className='mx-2 rounded-lg overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105'>
                  <img 
                    src={poster} 
                    alt={`Movie ${index}`}
                    className='w-full h-56 object-cover opacity-85'
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/300x450/555/fff?text=Movie+${index + 1}`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Center Content */}
        <div className='flex-1 flex items-center justify-center px-6 py-8 relative z-20'>
          <div className='text-center max-w-2xl mx-auto bg-black/40 p-8 rounded-2xl backdrop-blur-sm border border-white/10'>
            {/* MOCTALE Logo */}
            <div className='mb-8'>
              <div className='flex items-center justify-center mb-4'>
                <div className='w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg'>
                  <span className='text-white text-2xl font-bold'>T</span>
                </div>
                <h1 className='text-4xl font-bold text-white tracking-wider'>TALE</h1>
              </div>
            </div>

            {/* Main Heading */}
            <h2 className='text-5xl font-bold text-white mb-6 leading-tight'>
              FIND TALES<br />
              <span className='text-purple-400'>THAT MATTER</span>
            </h2>

            {/* Subtitle */}
            <p className='text-lg text-gray-300 mb-8 leading-relaxed font-light'>
              Discover, track, and share your favorite movies and shows with a<br />
              community of film enthusiasts
            </p>

            {/* Buttons */}
            <div className='flex gap-4 justify-center items-center flex-wrap'>
              <button 
                onClick={handleGetMovies}
                className='bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-purple-600/25'
              >
                Join Now
              </button>
              <button className='border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl'>
                ▶ Overview
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Two Scrolling Columns */}
        <div className='flex flex-shrink-0'>
          {/* Right Column 1 - Scrolling Down */}
          <div className='w-48 relative overflow-hidden'>
            <div className='animate-scroll-down space-y-3 py-4'>
              {[...moviePosters.slice(2), ...moviePosters.slice(2), ...moviePosters.slice(2)].map((poster, index) => (
                <div key={`right1-${index}`} className='mx-2 rounded-lg overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105'>
                  <img 
                    src={poster} 
                    alt={`Movie ${index}`}
                    className='w-full h-56 object-cover opacity-85'
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/300x450/666/fff?text=Movie+${index + 1}`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column 2 - Scrolling Up */}
          <div className='w-48 relative overflow-hidden'>
            <div className='animate-scroll-up space-y-3 py-4'>
              {[...moviePosters.slice(4).reverse(), ...moviePosters.slice(4).reverse(), ...moviePosters.slice(4).reverse()].map((poster, index) => (
                <div key={`right2-${index}`} className='mx-2 rounded-lg overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105'>
                  <img 
                    src={poster} 
                    alt={`Movie ${index}`}
                    className='w-full h-56 object-cover opacity-85'
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/300x450/777/fff?text=Movie+${index + 1}`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle gradient overlay for depth */}
      <div className='absolute inset-0 bg-gradient-to-r from-gray-900/40 via-transparent to-gray-900/40 pointer-events-none'></div>
    </div>
  )
}

export default Landing