// import React from 'react'

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchCast } from '/src/services/api.jsx'
import { fetchConfig } from '/src/services/api.jsx'
import Loader from '/src/components/Loader/Loader.jsx'

const MovieCast = () => {
  const { movieId } = useParams();
  const [actors, setActors] = useState({});
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getConfig = async () => {
      setLoading(true);
      const configuration = await fetchConfig();
      setConfig(configuration);
      setLoading(false);
    }
    getConfig();
  }, [])


  useEffect(() => {
    const getCast = async () => {
        const data = await fetchCast(movieId);
        setActors(data);
      }
      getCast();
  }, [movieId])

  const actorImgUrlBase = config ? `${config.images.secure_base_url}/w200` : "";

  if (loading) {
    return <Loader />;
  }

  return (
  <div>
    <ul>
      {actors.length > 0 ? (
          actors.map(actor => (
              actor.known_for_department === 'Acting' && (
                  <li key={actor.id}>
                      <div>
                          <img 
                             src={`${actorImgUrlBase}${actor.profile_path}`} 
                             alt={actor.name} 
                          />
                          <div>
                              <h2>{actor.name}</h2>
                              <p>{actor.character}</p>
                          </div>
                      </div>
                      <hr />
                  </li>
              )
          ))
      ) : (
        <li>No actors found.</li>
      )}
    </ul>
  </div>
  )
}

export default MovieCast
