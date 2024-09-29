

import { Field, Form, Formik } from "formik"
import MovieList from '/src/components/MovieList/MovieList.jsx'
import { useSearchParams } from "react-router-dom";


const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
   const query = searchParams.get('query') ?? '';

   const handleSubmit = (values) => {
    setSearchParams({ query: values.query }); 
  };

  const initialValues = {
    query: '',
  };


  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field name='query' placeholder='Search for movies...'/>
          <button type='submit'>Search</button>
        </Form>
      </Formik>
      <MovieList query={query}/>
    </>
  )
}

export default MoviesPage