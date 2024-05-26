import { Link } from "react-router-dom";
import { useEffect } from "react";

// TUKAJ SE MORAJO STVARI PRIKAZOVATI DINAMOCNO
const FlatItem = ({ nepremicnina }) => {
    const { id, naziv, cena, slug, image_urls, posredovanje, agencija } = nepremicnina;

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top when the component mounts
    }, []);


    return (
        <div className="text-center col-lg-4 col-12 col-md-6 ">
            <div className="item">
                <div className="item-image">
                    {image_urls.length > 0 && (
                        <img className="img-fluid" src={image_urls[0]} alt={naziv} />
                    )}
                </div>
                <div className="item-description">
                    <div className="d-flex justify-content-between mb-3">
                        <span className="item-title">{naziv}</span>
                        <span className="item-price">{cena}€</span>
                    </div>
                    <div className="item-icon d-flex alig-items-center justify-content-between">
                        <div>
                            <i className="fas fa-check-circle"></i> <span>{posredovanje}</span>
                        </div>
                        <div>
                            <i className="fas fa-check-circle"></i> <span> {agencija} </span>
                        </div>
                        <Link 
                            to={{ pathname: `/nepremicnina/${id}`, state: { nepremicnina } }} 
                            className="item-title"
                            onClick={() => window.scrollTo(0, 0)} >
                            <button className="btn btn-detail">Poglej</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlatItem