import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviews } from '/src/services/api.jsx';
import toast from 'react-hot-toast';
import Loader from '/src/components/Loader/Loader.jsx';
import s from '/src/components/MovieReviews/MovieReviews.module.css'

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReviews = async () => {
      setLoading(true);
      try {
        const data = await fetchReviews(movieId);
        setReviews(data?.results || []); 
      } catch {
        toast.error('An error occurred while retrieving feedback. Please try again.');
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    getReviews();
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }
  
  return (
    <div className={s.container}>
      {reviews.length === 0 ? (
        <p>No reviews.</p> 
      ) : (
        <ul className={s.list}>
          {reviews.map((review) => (
            <li className={s.item} key={review.id}>
              <h2 className={s.author}>{review.author}</h2>
              <p className={s.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;

