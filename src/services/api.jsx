import axios from 'axios'
import toast from 'react-hot-toast';


const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTkyZDEyNmZiODE0NzE5MjMxOTQ4YjFhYjQ3YmFmMSIsIm5iZiI6MTcyNzU1MDM3NS44NTY2NTQsInN1YiI6IjY2Zjg0ZmZjMGY2ZmEyY2ZjZTVmNDYwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2Tpo5361WUm6YgOQi-0ZXyZKYGWPuRXhTHQfqfB1Z5s';


export const fetchMovies = async () => {
    const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';


  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      return response.data.results;
  } catch {
      toast.error('Something went wrong!');
      return [];
  }
}


export const fetchMovieById = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      return response.data;
  } catch { 
      toast.error('Something went wrong!');
      return null;
  }
}


export const fetchConfig = async () => {
  const url = 'https://api.themoviedb.org/3/configuration';

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch {
    toast.error('Something went wrong!');
    return null;
  }
};


export const fetchCast = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.cast;
  } catch {
    toast.error('Something went wrong!');
    return null;
  }
};


export const fetchReviews = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch {
    toast.error('Something went wrong!'); 
    return null;
  }
};

