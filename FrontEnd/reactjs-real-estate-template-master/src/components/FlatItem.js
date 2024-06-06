import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ComparisonContext } from "../other/ComparisonContext";
import axios from "axios";
import noImage from "../noImage.jpg";
import api from "../services/api";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../App.css";

const FlatItem = ({ nepremicnina }) => {
  const { id, naziv, cena, image_urls, posredovanje, agencija } = nepremicnina;
  const { comparisonList, addToComparison, removeFromComparison } =
    useContext(ComparisonContext);

  const formattedCena =
    posredovanje === "Oddaja" ? `${cena} €/mesec` : `${cena} €`;

  const isInComparison = comparisonList.some((item) => item.id === id);

  const handleAddToComparison = () => {
    if (comparisonList.length >= 3) {
      alert("Največje število primerjav je 3.");
    } else {
      addToComparison(nepremicnina);
    }
  };

  const handleRemoveFromComparison = () => {
    removeFromComparison(id);
  };

  const imageUrl = image_urls.length > 0 ? image_urls[0] : noImage;

  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      const user = sessionStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        const userEmail = userData ? userData.email : null;

        if (userEmail) {
          try {
            const response = await api.get(
              `/uporabniki/${userEmail}/favorites`
            );
            setIsFavorited(response.data.includes(id));
          } catch (error) {
            console.error("Error fetching user favorites", error);
          }
        }
      }
    };

    fetchFavorites();
  }, [id]);

  const handleFavoriteClick = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userEmail = user ? user.email : null;

    if (user) {
      try {
        const url = isFavorited
          ? "/uporabniki/removeFavorite"
          : "/uporabniki/addFavorite";
        await api.post(url, {
          userEmail: userEmail,
          propertyId: id,
        });
        setIsFavorited(!isFavorited);
      } catch (error) {
        console.error("Error updating favorites", error);
      }
    } else {
      alert("Za dodajanje med priljubljene se je potrebno prijaviti.");
    }
  };

  return (
    <div className="text-center col-lg-4 col-12 col-md-6">
      <div className="item">
        <div className="item-image">
        <Link
              to={{ pathname: `/nepremicnina/${id}`, state: { nepremicnina } }}
              className="item-title"
            >
          <img className="img-fluid" src={imageUrl} alt={naziv} />
         </Link>
        </div>
        <div className="item-description">
          <div>
            <span className="item-price">{formattedCena}</span>
            <button onClick={handleFavoriteClick} className="favorite-button">
              {isFavorited ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
            </button>
          </div>
          <div className="item-title">
            <span className="item-title">{naziv}</span>
          </div>
          <div className="item-icon">
            <div>
              <i className="fas fa-check-circle"></i>{" "}
              <span>{posredovanje}</span>
            </div>
            <div>
              <i className="fas fa-check-circle"></i> <span>{agencija}</span>
            </div>
          </div>
          <div className="item-buttons">
            <Link
              to={{ pathname: `/nepremicnina/${id}`, state: { nepremicnina } }}
              className="item-title"
            >
              <button className="btn-1 btn-detail mt-2">Poglej</button>
            </Link>
            {isInComparison ? (
              <button
                onClick={handleRemoveFromComparison}
                className="btn btn-comparison"
              >
                <i className="fas fa-trash-alt"></i> Odstrani
              </button>
            ) : (
              <button
                onClick={handleAddToComparison}
                className="btn btn-comparison"
              >
                <i className="fas fa-exchange-alt"></i> Primerjaj
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlatItem;
