import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ComparisonContext } from "../other/ComparisonContext";
import noImage from "../noImage.jpg";

const FlatItem = ({ nepremicnina }) => {
  const { id, naziv, cena, image_urls, posredovanje, agencija } = nepremicnina;
  const { comparisonList, addToComparison, removeFromComparison } =
    useContext(ComparisonContext);

  const formattedCena =
    posredovanje === "Oddaja" ? `${cena}€/mesec` : `${cena}€`;

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

  return (
    <div className="text-center col-lg-4 col-12 col-md-6">
      <div className="item">
        <div className="item-image">
          <img className="img-fluid" src={imageUrl} alt={naziv} />
        </div>
        <div className="item-description">
        <div>
         <span className="item-price">{formattedCena}</span>
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
              <button className="btn btn-detail">Poglej</button>
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
