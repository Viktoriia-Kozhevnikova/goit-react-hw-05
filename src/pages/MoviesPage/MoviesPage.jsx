import { Field, Form, Formik } from "formik";
import MovieList from '/src/components/MovieList/MovieList.jsx';
import { useSearchParams } from "react-router-dom";
import s from '/src/pages/MoviesPage/MoviesPage.module.css'

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  const handleSubmit = (values, { resetForm })=> {
    if (values.query) {
      setSearchParams({ query: encodeURIComponent(values.query) });
      resetForm();
    } else {
      setSearchParams({});
    }
  };

  const initialValues = {
    query: query,
  };

  return (
    <div className={s.container}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={s.form}>
          <Field className={s.field} name='query' placeholder='Search for movies...' />
          <button className={s.btn} type='submit'>Search</button>
        </Form>
      </Formik>
      {query && <MovieList className={s.list} query={query} />}
    </div>
  );
};

export default MoviesPage;

