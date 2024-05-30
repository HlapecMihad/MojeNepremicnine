import React from "react";
import "../App.css";
import ImageGallery from "react-image-gallery";
import { useLocation } from "react-router-dom";
import "react-image-gallery/styles/css/image-gallery.css";
import useScrollToTop from "../other/useScrollToTop";
import {
  FaBed,
  FaBath,
  FaCalendarAlt,
  FaHome,
  FaRulerCombined,
  FaBuilding,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import CallToAction from "./CallToAction";

const FlatDetail = () => {
  useScrollToTop();
  const location = useLocation();

  const nepremicnina = location.state.nepremicnina;

  const {
    id,
    naziv,
    posredovanje,
    link,
    tip_nepremicnine,
    lokacija,
    st_sob,
    cena,
    st_spalnic,
    st_kopalnic,
    leto_izgradnje,
    st_nadstropij,
    velikost_zemljisca,
    velikost_skupaj,
    image_urls,
    opis,
    leto_obnove,
    agencija,
    lastnosti,
  } = nepremicnina;

  let formattedCena;
  if (cena !== 0) {
    formattedCena = posredovanje === "Oddaja" ? `${cena}/mesec` : cena;
  } else {
    formattedCena = "Po dogovoru";
  }

  const images = image_urls.map((url) => ({
    original: url,
    thumbnail: url,
  }));

  const mapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAyYnmIFV6uTzC5hH3frzt3R-dKItQL1K4&q=${encodeURIComponent(
    lokacija
  )}`;

  return (
    <div className="flat-detail">
      {/*<div className="page-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="page-title">DETAIL</h1>
              <h2 className="page-description">Lorem ipsum dolor sit amet</h2>
            </div>
          </div>
        </div>
  </div>*/}
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-lg-12">
            <div className="fd-top flat-detail-content">
              <div>
                <h3 className="flat-detail-title">{naziv}</h3>
                <p className="fd-address">
                  <i className="fas fa-map-marker-alt"></i> {lokacija}
                </p>
                <span>
                  <i
                    className="fa fa-home"
                    style={{
                      fontSize: "24px",
                      color: "#000",
                      marginRight: "5px",
                    }}
                  ></i>
                  {tip_nepremicnine}
                </span>
              </div>
              <div>
                <span className="fd-price">{formattedCena} €</span>
              </div>
            </div>
            <ImageGallery
              items={images}
              showNav={true}
              showFullscreenButton={false}
              showPlayButton={false}
              autoPlay={false}
            />
            <div className="row">
              <div className="col-lg-8">
                <div className="fd-item">
                  <h4>Opis</h4>
                  <p>{opis}</p>
                </div>
                <div className="fd-item fd-property-detail">
                  <h4>Pregled</h4>
                  <div className="row">
                    {st_sob !== 0 && (
                      <div className="col-lg-6 col-md-6 d-flex align-items-center mb-3">
                        <FaHome className="icon" />
                        <div className="ms-2">
                          <div>
                            <b>Število sob: </b>
                          </div>
                          <div>{st_sob}</div>
                        </div>
                      </div>
                    )}
                    {st_spalnic !== 0 && (
                      <div className="col-lg-6 col-md-6 d-flex align-items-center mb-3">
                        <FaBed className="icon" />
                        <div className="ms-2">
                          <div>
                            <b>Število spalnic: </b>
                          </div>
                          <div>{st_spalnic}</div>
                        </div>
                      </div>
                    )}
                    {st_kopalnic !== 0 && (
                      <div className="col-lg-6 col-md-6 d-flex align-items-center mb-3">
                        <FaBath className="icon" />
                        <div className="ms-2">
                          <div>
                            <b>Število kopalnic: </b>
                          </div>
                          <div>{st_kopalnic}</div>
                        </div>
                      </div>
                    )}
                    {leto_izgradnje !== 0 && (
                      <div className="col-lg-6 col-md-6 d-flex align-items-center mb-3">
                        <FaCalendarAlt className="icon" />
                        <div className="ms-2">
                          <div>
                            <b>Leto izgradnje: </b>
                          </div>
                          <div>{leto_izgradnje}</div>
                        </div>
                      </div>
                    )}
                    {st_nadstropij !== 0 && (
                      <div className="col-lg-6 col-md-6 d-flex align-items-center mb-3">
                        <FaBuilding className="icon" />
                        <div className="ms-2">
                          <div>
                            <b>Število nadstropij: </b>
                          </div>
                          <div>{st_nadstropij}</div>
                        </div>
                      </div>
                    )}
                    {velikost_zemljisca !== "N/A" && (
                      <div className="col-lg-6 col-md-6 d-flex align-items-center mb-3">
                        <FaRulerCombined className="icon" />
                        <div className="ms-2">
                          <div>
                            <b>Velikost zemljišča: </b>
                          </div>
                          <div>{velikost_zemljisca.split(" ")[0]} m²</div>
                        </div>
                      </div>
                    )}
                    {velikost_skupaj !== "N/A" && (
                      <div className="col-lg-6 col-md-6 d-flex align-items-center mb-3">
                        <FaRulerCombined className="icon" />
                        <div className="ms-2">
                          <div>
                            <b>Velikost skupaj: </b>
                          </div>
                          <div>{velikost_skupaj.split(" ")[0]} m²</div>
                        </div>
                      </div>
                    )}
                    {leto_obnove !== 0 && (
                      <div className="col-lg-6 col-md-6 d-flex align-items-center mb-3">
                        <FaCalendarAlt className="icon" />
                        <div className="ms-2">
                          <div>
                            <b>Leto obnove: </b>
                          </div>
                          <div>{leto_obnove}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="fd-item fd-features">
                  <h4>Lastnosti</h4>
                  <div className="row">
                    {lastnosti.map((feature, index) => (
                      <div className="col-lg-4" key={index}>
                        <i className="fa fa-check"></i>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="fd-item">
                  <h4>Lokacija</h4>
                  <iframe
                    src={mapsUrl}
                    width="100%"
                    height="450"
                    loading="lazy"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="fd-sidebar-item">
                  <h4>Agencija</h4>
                  <div className="agencija-item">
                    <h6>{agencija}</h6>
                  </div>
                  <div className="link-item">
                    <CallToAction
                      link={link}
                      text="Klikni tukaj za več informacij"
                    />
                  </div>
                </div>
                {/*<div className="fd-sidebar-item">
                  <h4>Category</h4>
                  <ul className="category-ul">
                    <li>Category 1</li>
                    <li>Category 2</li>
                    <li>Category 3</li>
                    <li>Category 4</li>
                    <li>Category 5</li>
                  </ul>
                </div>
                <div className="fd-sidebar-item">
                  <h4>Recently Added</h4>
                  <div className="recently-item">
                    <img src="/img/product1.jpeg" alt="detail" width="50px" />
                    <span>Lorem Ipsum Dolor</span>
                  </div>
                  <div className="recently-item">
                    <img src="/img/product1.jpeg" alt="detail" width="50px" />
                    <span>Lorem Ipsum Dolor</span>
                  </div>
                  <div className="recently-item">
                    <img src="/img/product1.jpeg" alt="detail" width="50px" />
                    <span>Lorem Ipsum Dolor</span>
                  </div>
                </div>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlatDetail;
