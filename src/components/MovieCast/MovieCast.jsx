import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCast, fetchConfig } from '/src/services/api.jsx';
import Loader from '/src/components/Loader/Loader.jsx';
import toast from 'react-hot-toast'; 
import s from '/src/components/MovieCast/MovieCast.module.css'

const MovieCast = () => {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const configuration = await fetchConfig();
        setConfig(configuration);

        const data = await fetchCast(movieId);
        setActors(data);
      } catch {
        setError('Failed to fetch data.'); 
        toast.error('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  const actorImgUrlBase = config ? `${config.images.secure_base_url}/w200` : '';

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  } 
  return (
    <div className={s.container}>
      <ul>
        {actors.length > 0 ? (
          actors.map((actor) =>
            actor.known_for_department === 'Acting' ? (
              <li key={actor.id}>
                <div className={s.actor}>
                  <img
                    src={`${actorImgUrlBase}${actor.profile_path}`}
                    alt={actor.name}
                  />
                  <div>
                    <h2>{actor.name}</h2>
                    <p>Character: {actor.character}</p>
                  </div>
                </div>
                <hr />
              </li>
            ) : null
          )
        ) : (
          <li>No actors found.</li>
        )}
      </ul>
    </div>
  );
};

export default MovieCast;

