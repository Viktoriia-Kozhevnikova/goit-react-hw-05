// import React from 'react'
import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useParams, Outlet, useLocation } from "react-router-dom"
import { fetchMovieById } from '/src/services/api.jsx'
import { fetchConfig } from '/src/services/api.jsx'
import Loader from '/src/components/Loader/Loader.jsx'
import s from '/src/pages/MovieDetailsPage/MovieDetailsPage.module.css'
import clsx from 'clsx';


const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const goBackRef = useRef(location.state ?? '/');

  const linkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };
  
  useEffect(() => {
    const getConfig = async () => {
      setLoading(true);
      const configuration = await fetchConfig();
      setConfig(configuration);
      setLoading(false);
    }
    getConfig();
  }, [])

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchMovieById(movieId);
      setMovie(data);
      setLoading(false);
    };
    getData();
  }, [movieId]);
    
 if (loading) {
    return <Loader />;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  const imgUrl = `${config.images.base_url}${config.images.poster_sizes[3]}${movie.poster_path}`;

  return (
    <div>
      <Link to={goBackRef.current}>Go back</Link>
      <div>
        <img src={imgUrl} alt={movie.title}/>
      </div>
      <div>
        <h1>{movie.title}</h1>
        <p>{movie.release_date}</p>
        <p>{movie.tagline}</p>
        <p>{movie.overview}</p>
      </div>
      <hr />
      <div className={s.container}>
        <NavLink className={linkClass} to={`/movies/${movieId}/cast`}>Cast</NavLink>
        <NavLink className={linkClass} to={`/movies/${movieId}/reviews`}>Reviews</NavLink>
      </div>
      <Suspense fallback='<div>Loading...</div>'>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default MovieDetailsPage