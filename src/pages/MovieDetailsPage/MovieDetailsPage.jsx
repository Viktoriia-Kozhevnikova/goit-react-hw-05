import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useParams, Outlet, useLocation } from 'react-router-dom';
import { fetchMovieById } from '/src/services/api.jsx';
import { fetchConfig } from '/src/services/api.jsx';
import Loader from '/src/components/Loader/Loader.jsx';
import s from '/src/pages/MovieDetailsPage/MovieDetailsPage.module.css';
import clsx from 'clsx';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const goBackRef = useRef(location.state ?? '/movies');

  const linkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  useEffect(() => {
    const getConfig = async () => {
      try {
        setLoading(true);
        const configuration = await fetchConfig();
        setConfig(configuration);
      } catch (error) {
        console.error("Failed to fetch config:", error);
      } finally {
        setLoading(false);
      }
    };
    getConfig();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  if (!movie) {
    return <Loader />;
  }

  const imgUrl = config ? `${config.images.base_url}${config.images.poster_sizes[3]}${movie.poster_path}` : '';

  return (
    <div>
      <Link className={s.btn} to={goBackRef.current}>Go back</Link>
      <div className={s.container}>
        <img className={s.img} src={imgUrl} alt={movie.title} />
        <div className={s.data}>
          <h1>{movie.title}</h1>
          <p>Release date: <span className={s.span}>{movie.release_date}</span></p>
          <p>{movie.tagline}</p>
          <p>{movie.overview}</p>
        </div>
      </div>
      <hr/>
      <div className={s.links}>
        <NavLink className={linkClass} to={`/movies/${movieId}/cast`}>Cast</NavLink>
        <NavLink className={linkClass} to={`/movies/${movieId}/reviews`}>Reviews</NavLink>
      </div>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;

