// import React from 'react'
import { useMemo, useEffect, useState } from 'react'
import {fetchMovies} from '/src/services/api.jsx';
import {Link, useLocation} from 'react-router-dom'

const MovieList = ({query}) => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

    useEffect(() => {
        const getAllMovies = async () => {
            const data = await fetchMovies();
            setMovies(data);
        };
        getAllMovies();
    }, []);
  
  const filteredData = useMemo(() => {
    if (!query) return movies;

    return movies.filter((movie) =>
      movie.title ? movie.title.toLowerCase().includes(query.toLowerCase()) : false
    );
  }, [movies, query]);

  if (!filteredData || filteredData.length === 0) {
    return <div>No movies found</div>;
  }
  
  return (
    <div>
        <ul>
             {movies.length > 0 ? ( 
          filteredData.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={location}>{movie.title}</Link>
            </li>
          ))
        ) : (
          <li>No movies found</li>
        )}   
        </ul>
    </div>
  )
}

export default MovieList



// import { useEffect, useState } from 'react'
// import {fetchMovies} from '/src/services/api.jsx';
// import {Link} from 'react-router-dom'

// const MovieList = ({filteredData}) => {
//     const [movies, setMovies] = useState([]);

//     useEffect(() => {
//         const getAllMovies = async () => {
//             const data = await fetchMovies();
//             setMovies(data);
//         };
//         getAllMovies();
//     }, []);

//    if (!movies) {
//     return <div>Loading...</div>;
//   }
  
    
//   return (
//     <div>
//         <ul>
//              {movies.length > 0 ? ( 
//           filteredData.map(movie => (
//             <li key={movie.id}>
//               <Link to={/movies/${movie.id}}>{movie.title}</Link>
//             </li>
//           ))
//         ) : (
//           <li>No movies found</li>
//         )}   
//         </ul>
//     </div>
//   )
// }

// export default MovieList