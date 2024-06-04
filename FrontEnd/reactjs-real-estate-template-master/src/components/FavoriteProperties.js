import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlatItem from './FlatItem';
import api from '../services/api'

const FavoriteProperties = () => {
    const [allProperties, setAllProperties] = useState([]);
    const [favoriteProperties, setFavoriteProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const allPropertiesResponse = await api.get('/nepremicnine/vseNepremicnine');
        setAllProperties(allPropertiesResponse.data);
      } catch (error) {
        console.error('Error fetching all properties', error);
      }
    };

    const fetchFavoriteProperties = async () => {
      const user = sessionStorage.getItem('user');
      const userData = JSON.parse(user);
      const userEmail = userData ? userData.email : null;

      if (userEmail) {
        try {
          const favoriteIdsResponse = await api.get(`/uporabniki/${userEmail}/favorites`);
          const favoriteIds = favoriteIdsResponse.data;

          const favoriteProperties = allProperties.filter(property => 
            favoriteIds.includes(property.id)
          );

          setFavoriteProperties(favoriteProperties);
        } catch (error) {
          console.error('Error fetching favorite properties', error);
        }
      }
    };

    fetchProperties().then(fetchFavoriteProperties);
  }, [allProperties]);

  if (favoriteProperties.length === 0) {
   return (
     <div className="comparison-page">
       <h1 className="middle">Priljubljene nepremičnine</h1>
       <p className="middle1">Nobena nepremičnina ni bila izbrana.</p>
     </div>
   );
 }

  return (
    <div className="favorite-properties">
      <h1 className='middle'>Priljubljene nepremičnine</h1>
      <div className="row">
        {favoriteProperties.map(property => (
          <FlatItem key={property.id} nepremicnina={property} />
        ))}
      </div>
    </div>
  );
};

export default FavoriteProperties;
