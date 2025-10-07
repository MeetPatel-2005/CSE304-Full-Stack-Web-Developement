const API_KEY = '1af1383b';
const BASE_URL = 'http://www.omdbapi.com/';

// Since OMDB doesn't have a direct "popular movies" endpoint, 
// we'll search for popular movie titles
const popularMovies = [
  'The Dark Knight', 'Inception', 'Interstellar', 'The Matrix', 
  'Avatar', 'Titanic', 'The Godfather', 'Pulp Fiction',
  'Fight Club', 'Forrest Gump', 'The Shawshank Redemption',
  'Goodfellas', 'The Lord of the Rings', 'Star Wars',
  'Jurassic Park', 'Back to the Future', 'Terminator'
];

export const movieService = {
  // Search for movies by title
  searchMovies: async (query) => {
    try {
      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`);
      const data = await response.json();
      
      if (data.Response === 'True') {
        return data.Search;
      } else {
        throw new Error(data.Error || 'Failed to fetch movies');
      }
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  // Get movie details by ID
  getMovieById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
      const data = await response.json();
      
      if (data.Response === 'True') {
        return data;
      } else {
        throw new Error(data.Error || 'Failed to fetch movie details');
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  // Get movie details by title
  getMovieByTitle: async (title) => {
    try {
      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(title)}&plot=short`);
      const data = await response.json();
      
      if (data.Response === 'True') {
        return data;
      } else {
        throw new Error(data.Error || 'Failed to fetch movie');
      }
    } catch (error) {
      console.error('Error fetching movie by title:', error);
      throw error;
    }
  },

  // Get popular movies (simulated by searching for popular titles)
  getPopularMovies: async () => {
    try {
      const moviePromises = popularMovies.slice(0, 12).map(title => 
        movieService.getMovieByTitle(title).catch(error => {
          console.warn(`Failed to fetch ${title}:`, error);
          return null;
        })
      );
      
      const movies = await Promise.all(moviePromises);
      return movies.filter(movie => movie !== null);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  // Search for trending movies by year
  getTrendingMovies: async (year = new Date().getFullYear()) => {
    try {
      const searchTerms = ['action', 'drama', 'comedy', 'thriller'];
      const moviePromises = searchTerms.map(async (term) => {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${term}&y=${year}&type=movie`);
        const data = await response.json();
        return data.Response === 'True' ? data.Search.slice(0, 3) : [];
      });
      
      const results = await Promise.all(moviePromises);
      return results.flat();
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  }
};

export default movieService;