import { lazy, Suspense } from "react";
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import css from "./App.module.css";
import Navigation from './Navigation/Navigation';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast = lazy(() => import('./MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./MovieReviews/MovieReviews'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));


function App() {
  return (
    <>
      <Toaster />
      <Navigation />
      <div className={css.container}>
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/movies' element={<MoviesPage />} />
          <Route path='/movies/:movieId' element={<MovieDetailsPage />}> 
            <Route path='cast' element={<MovieCast />} />
            <Route path='reviews' element={<MovieReviews />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </>
  )
}

export default App;
