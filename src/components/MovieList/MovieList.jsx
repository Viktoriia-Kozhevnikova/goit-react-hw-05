
import { useMemo, useEffect, useState } from 'react';
import { fetchMovies } from '/src/services/api.jsx';
import { Link, useLocation } from 'react-router-dom';
import Loader from '/src/components/Loader/Loader.jsx'
import s from '/src/components/MovieList/MovieList.module.css';
import toast from 'react-hot-toast';

const MovieList = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch {
        setError('Failed to fetch movies.');
        toast.error('Failed to fetch movies.');
      } finally {
        setLoading(false);
      }
    };
    getAllMovies();
  }, []);

  const filteredData = useMemo(() => {
    if (!query) return movies;

    return movies.filter((movie) =>
      movie.title ? movie.title.toLowerCase().includes(query.toLowerCase()) : false
    );
  }, [movies, query]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (filteredData.length === 0) {
    return <div className={s.error}>No movies found</div>;
  }

  return (
    <div className={s.container}>
      <ul className={s.list}>
        {filteredData.map((movie) => (
          <li key={movie.id}>
            <Link className={s.link} to={`/movies/${movie.id}`} state={location}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;



