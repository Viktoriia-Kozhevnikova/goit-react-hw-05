
import { Field, Form, Formik } from "formik"; 
import * as Yup from "yup";
import MovieList from "/src/components/MovieList/MovieList.jsx";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMoviesByQuery } from "/src/services/api.jsx";
import toast from "react-hot-toast";
import s from "/src/pages/MoviesPage/MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }
    const fetchMoviesData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMoviesByQuery(query);
        if (data && data.length > 0) {
          const searchMovie = data.filter((movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase())
          );
          setMovies(searchMovie);
          if (searchMovie.length === 0) {
            toast.info(`No movies found for "${query}"`);
          }
        } else {
          setMovies([]); 
          toast.info(`No movies found for "${query}"`);
        }
      } catch {
        setError("Failed to fetch movies");
        toast.error("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesData();
  }, [query]);

  const handleSubmit = (values, { resetForm }) => {
    if (values.query.trim()) {  
      setSearchParams({ query: values.query.trim() }); 
      resetForm();
    } else {
      setSearchParams({});
    }
  };

  const initialValues = {
    query: query,
  };

  const FeedbackSchema = Yup.object().shape({
    query: Yup.string()
      .min(1, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  return (
    <div className={s.container}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
        <Form className={s.form}>
          <Field className={s.field} name="query" placeholder="Search for movies..." />
          <button className={s.btn} type="submit">Search</button>
        </Form>
      </Formik>
      {query && <MovieList className={s.list} movies={movies} />}
      {!loading && !error && query && movies.length === 0 && (
        <p>No movies found.</p> 
      )}
    </div>
  );
};

export default MoviesPage;
















// import { Field, Form, Formik } from "formik";
// import * as Yup from "yup";
// import MovieList from "/src/components/MovieList/MovieList.jsx";
// import { useSearchParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { fetchMoviesByQuery } from "/src/services/api.jsx";
// import toast from "react-hot-toast";
// import s from "/src/pages/MoviesPage/MoviesPage.module.css";

// const MoviesPage = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const query = searchParams.get('query') ?? '';
  
//   const [movies, setMovies] = useState([]);
  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!query) {
//       setMovies([]);  
//       return;
//     }

//     const fetchMoviesData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const data = await fetchMoviesByQuery(query);
//          const searchMovie = data?.filter((movie) =>
//         movie.title.toLowerCase().includes(query.toLowerCase())
//       );
//       setMovies(searchMovie);
//         if (data.length === 0) {
//           toast.info(`No movies found for "${query}"`);
//         }
//       } catch {
//         setError("Failed to fetch movies");
//         toast.error("Failed to fetch movies");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMoviesData();
//   }, [query]);

//   const handleSubmit = (values, { resetForm }) => {
//     if (values.query.trim()) {  
//       setSearchParams({ query: encodeURIComponent(values.query.trim()) });
//       resetForm();
//     } else {
//       setSearchParams({});
//     }
//   };

//   const initialValues = {
//     query: query,
//   };

//   const FeedbackSchema = Yup.object().shape({
//     query: Yup.string()
//       .min(3, "Too Short!")
//       .max(50, "Too Long!")
//       .required("Required"),
//   });

//   return (
//     <div className={s.container}>
//       <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
//         <Form className={s.form}>
//           <Field className={s.field} name='query' placeholder='Search for movies...' />
//           <button className={s.btn} type='submit'>Search</button>
//         </Form>
//       </Formik>
//       {query && <MovieList className={s.list} movies={movies} />}
//       {!loading && !error && query && movies.length === 0 && (
//         <p>No movies found.</p> 
//       )}
//     </div>
//   );
// };

// export default MoviesPage;





















// import { Field, Form, Formik } from "formik";
// import * as Yup from "yup";
// import MovieList from "/src/components/MovieList/MovieList.jsx";
// import { useSearchParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { fetchMoviesByQuery } from "/src/services/api.jsx";
// import toast from "react-hot-toast";
// import s from "/src/pages/MoviesPage/MoviesPage.module.css";

// const MoviesPage = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const query = searchParams.get('query') ?? '';

 
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

  
//   useEffect(() => {
//     if (!query) return;

//     const fetchMoviesData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const data = await fetchMoviesByQuery(query);
//         setMovies(data);
//         if (data.length === 0) {
//           toast.info(`No movies found for "${query}"`);
//         }
//       } catch {
//         setError("Failed to fetch movies");
//         toast.error("Failed to fetch movies");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMoviesData();
//   }, [query]);

//   const handleSubmit = (values, { resetForm }) => {
//     if (values.query) {
//       setSearchParams({ query: encodeURIComponent(values.query) });
//       resetForm();
//     } else {
//       setSearchParams({});
//     }
//   };

//   const initialValues = {
//     query: query,
//   };


//   const FeedbackSchema = Yup.object().shape({
//     query: Yup.string()
//       .min(3, "Too Short!")
//       .max(50, "Too Long!")
//       .required("Required"),
//   });

//   return (
//     <div className={s.container}>
//       <Formik initialValues={initialValues} onSubmit={handleSubmit}  validationSchema={FeedbackSchema}>
//         <Form className={s.form}>
//           <Field className={s.field} name='query' placeholder='Search for movies...' />
//           <button className={s.btn} type='submit'>Search</button>
//         </Form>
//       </Formik>
//       {query && <MovieList className={s.list} movies={movies} />}
//       {!loading && !error && query && movies.length === 0 && (
//         <p>No movies found.</p> 
//       )}
//     </div>
//   );
// };

// export default MoviesPage;

















// import { Field, Form, Formik } from "formik";
// import * as Yup from "yup";
// import MovieList from "/src/components/MovieList/MovieList.jsx";
// import { useSearchParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { fetchMoviesByQuery } from "/src/services/api.jsx";
// import toast from "react-hot-toast";
// import s from "/src/pages/MoviesPage/MoviesPage.module.css";

// const MoviesPage = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const initialValues = {
//     query: '',
//   };

//   const FeedbackSchema = Yup.object().shape({
//     query: Yup.string()
//       .min(3, 'Too Short!')
//       .max(50, 'Too Long!')
//       .required('Required'),
//   });


//    const handleSubmit = (values) => {
//      handleChangeQuery(values.query);
//   };

//   const query = searchParams.get('query') ?? '';

//   const handleChangeQuery = (newQuery) => {
//     if (!newQuery) {
//       return setSearchParams({});
//     }
//     searchParams.set('query', newQuery);
//     setSearchParams(searchParams);
//   };

//   useEffect(() => {
//     const fetchMoviesData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         if (!query) return;
//         const data = await fetchMoviesByQuery(query);
//         setMovies(data);
//         if (data.length === 0) {
//           toast.info("No movies found.");
//         }
//       } catch {
//         setError("Failed to fetch movies");
//         toast.error("Failed to fetch movies");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMoviesData();
//   }, [query]);

 


  

//   return (
//     <div className={s.container}>
//       <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
//         <Form className={s.form}>
//           <Field className={s.field} name="query" placeholder="Search for movies..." />
//           <button className={s.btn} type="submit">Search</button>
//         </Form>
//       </Formik>
//       {query && <MovieList className={s.list} movies={movies} />}
//     </div>
//   );
// };

// export default MoviesPage;
























// import { Field, Form, Formik } from 'formik';
// import * as Yup from "yup";
// import MovieList from '/src/components/MovieList/MovieList.jsx';
// import { useSearchParams } from 'react-router-dom';
// import { useState, useEffect} from 'react';
// import { fetchMovies } from '/src/services/api.jsx';
// // import Loader from '/src/components/Loader/Loader.jsx';
// import toast from 'react-hot-toast';
// import s from '/src/pages/MoviesPage/MoviesPage.module.css';

// const MoviesPage = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const query = searchParams.get('query') ?? '';

 
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

  
//   useEffect(() => {
//     if (!query) return;

//     const fetchMoviesData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const data = await fetchMovies();
//         setMovies(data);
//         if (data.length === 0) {
//           toast.info('No movies found.');
//         }
//       } catch {
//         setError('Failed to fetch movies');
//         toast.error('Failed to fetch movies');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMoviesData();
//   }, [query]);

//   // const handleSubmit = (values, { resetForm }) => {
//   //   if (values.query) {
//   //     setSearchParams({ query: values.query });
//   //     resetForm();
//   //   } else {
//   //     setSearchParams({});
//   //   }
//   // };

//   const handleSubmit = (values) => {
//     handleChangeQuery(values.query);
//   };


//   const handleChangeQuery = (newQuery) => {
//     if (!newQuery) {
//       return setSearchParams({});
//     }
//     searchParams.set("query", newQuery);
//     setSearchParams(searchParams);
//   };


//   // const filteredData = useMemo(() => {
//   //   if (!query) return movies;

//   //   return movies.filter((movie) =>
//   //     movie.title ? movie.title.toLowerCase().includes(query.toLowerCase()) : false
//   //   );
//   //   }, [movies, query]);
  

//   const initialValues = {
//     query: query,
//   };

//   const FeedbackSchema = Yup.object().shape({
//     query: Yup.string()
//       .min(3, "Too Short!")
//       .max(50, "Too Long!")
//       .required("Required"),
//   });

//   return (
//     <div className={s.container}>
//       <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
//         <Form className={s.form}>
//           <Field className={s.field} name='query' placeholder='Search for movies...' />
//           <button className={s.btn} type='submit'>Search</button>
//         </Form>
//       </Formik>


//       <MovieList
//         movies={movies}
//         isLoading={loading}
//         isError={error}
//       />

//     </div>
//   );
// };

// export default MoviesPage;






























// import { Field, Form, Formik } from "formik";
// import MovieList from '/src/components/MovieList/MovieList.jsx';
// import { useSearchParams } from "react-router-dom";
// import s from '/src/pages/MoviesPage/MoviesPage.module.css'

// const MoviesPage = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const query = searchParams.get('query') ?? '';

//   const handleSubmit = (values, { resetForm })=> {
//     if (values.query) {
//       setSearchParams({ query: encodeURIComponent(values.query) });
//       resetForm();
//     } else {
//       setSearchParams({});
//     }
//   };

//   const initialValues = {
//     query: query,
//   };

//   return (
//     <div className={s.container}>
//       <Formik initialValues={initialValues} onSubmit={handleSubmit}>
//         <Form className={s.form}>
//           <Field className={s.field} name='query' placeholder='Search for movies...' />
//           <button className={s.btn} type='submit'>Search</button>
//         </Form>
//       </Formik>
//       {query && <MovieList className={s.list} query={query} />}
//     </div>
//   );
// };

// export default MoviesPage;

