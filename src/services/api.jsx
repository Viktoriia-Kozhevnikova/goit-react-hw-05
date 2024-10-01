import axios from 'axios';
import toast from 'react-hot-toast';

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTkyZDEyNmZiODE0NzE5MjMxOTQ4YjFhYjQ3YmFmMSIsIm5iZiI6MTcyNzU1MDM3NS44NTY2NTQsInN1YiI6IjY2Zjg0ZmZjMGY2ZmEyY2ZjZTVmNDYwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2Tpo5361WUm6YgOQi-0ZXyZKYGWPuRXhTHQfqfB1Z5s';

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const handleRequest = async (url) => {
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error(error); // Додано для логування помилок у консолі
    toast.error('Something went wrong!');
    return null;
  }
};

export const fetchMovies = async () => {
  const data = await handleRequest('trending/movie/day?language=en-US');
  return data?.results || [];
};

export const fetchMovieById = async (movieId) => {
  return await handleRequest(`movie/${movieId}?language=en-US`);
};

export const fetchConfig = async () => {
  return await handleRequest('configuration');
};

export const fetchCast = async (movieId) => {
  const data = await handleRequest(`movie/${movieId}/credits?language=en-US`);
  return data?.cast || [];
};

export const fetchReviews = async (movieId) => {
  return await handleRequest(`movie/${movieId}/reviews?language=en-US&page=1`);
};

export const fetchMoviesByQuery = async (query) => {
  const data = await handleRequest(`search/movie?query=${query}&language=en-US&page=1`);
  return data?.results || [];
};
