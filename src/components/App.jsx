
import { lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom'

// const HomePage = lazy(() => import('/src/pages/HomePage/HomePage.jsx'));
import HomePage from '/src/pages/HomePage/HomePage.jsx'

const MoviesPage = lazy(() => import('/src/pages/MoviesPage/MoviesPage.jsx'));
const MovieDetailsPage = lazy(() => import('/src/pages/MovieDetailsPage/MovieDetailsPage.jsx'));
const NotFoundPage = lazy(() => import('/src/pages/NotFoundPage/NotFoundPage.jsx'));


import MovieCast from '/src/components/MovieCast/MovieCast.jsx'
import MovieReviews from '/src/components/MovieReviews/MovieReviews.jsx'
import Navigation from '/src/components/Navigation/Navigation.jsx'
import Loader from '/src/components/Loader/Loader.jsx';

import '/src/components/App.css'



function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<HomePage /> } />
          <Route path='/movies' element={<MoviesPage/> } />
          <Route path='/movies/:movieId' element={<MovieDetailsPage />} >
            <Route path='/movies/:movieId/cast' element={<MovieCast />} />
            <Route path='/movies/:movieId/reviews' element={<MovieReviews />} />
          </Route>
          <Route path='*' element={<NotFoundPage/> } />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
