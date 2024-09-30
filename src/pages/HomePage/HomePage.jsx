import MovieList from '/src/components/MovieList/MovieList.jsx'
import s from '/src/pages/HomePage/HomePage.module.css'

const HomePage = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>Trending today</h1>
      <MovieList className={s.list}/>   
    </div>
  )
}

export default HomePage