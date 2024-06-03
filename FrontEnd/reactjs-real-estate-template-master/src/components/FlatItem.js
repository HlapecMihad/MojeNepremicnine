import { Link } from "react-router-dom";

// TUKAJ SE MORAJO STVARI PRIKAZOVATI DINAMOCNO
const FlatItem = ({ nepremicnina }) => {
  const { id, naziv, slug, cena, image_urls, posredovanje, agencija } =
    nepremicnina;

  const formattedCena =
    posredovanje === "Oddaja" ? `${cena}€/mesec` : `${cena}€`;
  return (
    <div className="text-center col-lg-4 col-12 col-md-6 ">
      <div className="item">
         <Link
              to={{ pathname: `/nepremicnina/${id}`, state: { nepremicnina } }}
              className="item-title"
            >
         <div className="item-image">
            {<img className="img-fluid" src={image_urls[0]} alt={naziv} />}
         </div>
        </Link>
        <div className="item-description">
         <div>
         <span className="item-price">{formattedCena}</span>
         </div>
          <div className="d-flex justify-content-between mb-3">
            <span className="item-title">{naziv}</span>
          </div>
          <div className="item-icon d-flex alig-items-center justify-content-between">
            <div>
              <i className="fas fa-check-circle"></i>{" "}
              <span>{posredovanje}</span>
            </div>
            <div>
              <i className="fas fa-check-circle"></i> <span> {agencija} </span>
            </div>
            <Link
              to={{ pathname: `/nepremicnina/${id}`, state: { nepremicnina } }}
              className="item-title"
            >
              <button className="btn btn-detail">Poglej</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlatItem;
