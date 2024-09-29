import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "/src/services/api.jsx";
import toast from 'react-hot-toast';
import Loader from '/src/components/Loader/Loader.jsx'

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReviews = async () => {
      setLoading(true);
      try {
        const data = await fetchReviews(movieId);
        if (data && data.results) {
          setReviews(data.results); 
        } else {
          setReviews([]); 
        }
      } catch {
        toast.error('An error occurred while retrieving feedback. Please try again.')
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
    <div>
      {reviews.length === 0 ? (
        <p>No reviews.</p> 
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h2>{review.author}</h2>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews