import { useState, useEffect } from 'react';
import { fetchMovies } from '/src/services/api.jsx'; 
import MovieList from '/src/components/MovieList/MovieList.jsx';
import s from '/src/pages/HomePage/HomePage.module.css';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const movies = await fetchMovies(); 
        setTrendingMovies(movies); 
      } catch {
        setError('Failed to load trending movies'); 
      }
    };

    getTrendingMovies();
  }, []); 

  return (
    <div className={s.container}>
      <h1 className={s.title}>Trending today</h1>
      {error ? (
        <p className={s.error}>{error}</p> 
      ) : (
        <MovieList movies={trendingMovies} className={s.list} />
      )}
    </div>
  );
};

export default HomePage;




// import MovieList from '/src/components/MovieList/MovieList.jsx'
// import s from '/src/pages/HomePage/HomePage.module.css'

// const HomePage = () => {
//   return (
//     <div className={s.container}>
//       <h1 className={s.title}>Trending today</h1>
//       <MovieList className={s.list}/>   
//     </div>
//   )
// }

// export default HomePage