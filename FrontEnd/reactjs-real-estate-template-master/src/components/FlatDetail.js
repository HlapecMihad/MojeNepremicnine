import ImageGallery from 'react-image-gallery';
import { useLocation } from 'react-router-dom';
import React, { useEffect } from "react";

const FlatDetail = () => {

    const location = useLocation();
    const nepremicnina = location.state.nepremicnina;

    const { id, naziv, posredovanje, link, tip_nepremicnine, lokacija, cena, st_sob, st_spalnic, st_kopalnic, leto_izgradnje, st_nadstropij, velikost_zemljisca, velikost_skupaj, image_urls, opis, leto_obnove, agencija, lastnosti } = nepremicnina;

    console.log(id, naziv, posredovanje, link, tip_nepremicnine, lokacija, cena, st_sob, st_spalnic, st_kopalnic, leto_izgradnje, st_nadstropij, velikost_zemljisca, velikost_skupaj, image_urls, opis, leto_obnove, agencija, lastnosti)


    const images = image_urls.map((url) => ({
        original: url,
        thumbnail: url,
    }));


    return (
        <div className="flat-detail">
            <div className="page-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-title">DETAIL</h1>
                            <h2 className="page-description">Lorem ipsum dolor sit amet</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="fd-top flat-detail-content">
                            <div>
                                <h3 className="flat-detail-title">{naziv}</h3>
                                <p className="fd-address"> <i className="fas fa-map-marker-alt"></i>
                                {lokacija}</p>
                            </div>
                            <div>
                                <span className="fd-price">{cena}€</span>
                            </div>
                        </div>
                        <div className="fd-item fd-gallery">
                            <h4>Gallery</h4>
                            <ImageGallery
                                items={images}
                                showNav={false}
                                showFullscreenButton={false}
                                showPlayButton={false}
                                slideDuration={0}
                                flickThreshold={0.50}
                            />
                        </div>
                        <div className="row">
                            <div className="col-lg-8">

                                <div className="fd-item fd-property-detail">
                                    <h4>Lastnosti</h4>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <span>Število sob: </span>
                                            <span>{st_sob}</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <span>Število spalnic: </span>
                                            <span>{st_spalnic}</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <span>Število kopalnic:  </span>
                                            <span>{st_kopalnic}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <span>Število nadstropij: </span>
                                            <span>{st_nadstropij}</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <span>Velikost Zemljišča: </span>
                                            <span>{velikost_zemljisca} m<sup>2</sup></span>
                                        </div>
                                        <div className="col-lg-4">
                                            <span>Velikost skupaj:  </span>
                                            <span>{velikost_skupaj} m<sup>2</sup></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <span>Leto izgradnje: </span>
                                            <span>{leto_izgradnje}</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <span>Leto obnove: </span>
                                            <span>{leto_obnove}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="fd-item">
                                    <h4>Opis</h4>
                                    <p>{opis}</p>
                                </div>
                                <div className="fd-item fd-features">
                                <h4>Značilnosti</h4>
                                <div className="row">
                                    {lastnosti.map((feature, index) => (
                                        <div key={index} className="col-lg-4">
                                            <i className="fa fa-check"></i>
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                                <div className="fd-item">
                                    <h4>Maps</h4>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15105200.564429!2d37.91245092855647!3d38.99130948591772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b0155c964f2671%3A0x40d9dbd42a625f2a!2zVMO8cmtpeWU!5e0!3m2!1str!2str!4v1630158674074!5m2!1str!2str" width="100%" height="450" loading="lazy"></iframe>
                                </div>
                            </div>
                            <div className="col-lg-4">
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
                                </div>
                                <div className="fd-sidebar-item">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlatDetail