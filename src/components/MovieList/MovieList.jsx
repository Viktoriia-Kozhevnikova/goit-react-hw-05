import { Link, useLocation } from "react-router-dom";
import s from "/src/components/MovieList/MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <div className={s.container}>
      <ul className={s.list}>
        {movies?.map((movie) => (
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



