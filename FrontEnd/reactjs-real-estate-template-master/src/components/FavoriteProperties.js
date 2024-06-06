import React, { useState, useEffect } from "react";
import api from "../services/api";
import FlatItem from "./FlatItem";

const FavoriteProperties = () => {
  const [favoriteProperties, setFavoriteProperties] = useState([]);

  useEffect(() => {
    const fetchFavoriteProperties = async () => {
      const user = sessionStorage.getItem("user");
      const userData = JSON.parse(user);
      const userEmail = userData ? userData.email : null;

      if (userEmail) {
        try {
          const favoriteIdsResponse = await api.get(
            `/uporabniki/${userEmail}/favorites`
          );
          const favoriteIds = favoriteIdsResponse.data;

          if (favoriteIds.length > 0) {
            const favoriteIdsString = favoriteIds.join(",");
            const favoritePropertiesResponse = await api.get(
              "/nepremicnine/vrniPriljubljeneNepremicnine",
              {
                params: { priljubljeneNepremicnine: favoriteIdsString },
              }
            );
            const data = favoritePropertiesResponse.data;
            const combinedProperties = [
              ...data.nepremicnine,
              ...data.nepremicnineOddaja,
            ];
            setFavoriteProperties(combinedProperties);
          } else {
            setFavoriteProperties([]);
          }
        } catch (error) {
          console.error("Error fetching favorite properties", error);
        }
      }
    };

    fetchFavoriteProperties();
  }, []);

  if (favoriteProperties.length === 0) {
    return (
      <div className="section-all-re">
        <h1 className="middle">Priljubljene nepremičnine</h1>
        <p className="middle1">Nobena nepremičnina ni bila izbrana.</p>
      </div>
    );
  }

  return (
    <section className="section-all-re">
      <h1 className="middle" style={{ padding: "20px" }}>
        Priljubljene nepremičnine
      </h1>
      <div className="container">
        <ul className="row">
          {favoriteProperties.map((property) => (
            <FlatItem key={property.id} nepremicnina={property} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FavoriteProperties;
