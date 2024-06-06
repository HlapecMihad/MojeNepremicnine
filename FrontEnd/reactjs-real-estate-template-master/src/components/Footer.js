import React from "react";

const Footer = () => {
    return (
        <section className="footer">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-6 text-center text-md-left">
                        <i className="fas fa-home"></i>
                        <span className="footer-other-text d-block mt-3 mb-3">
                            Smo podjetje, specializirano za prodajo nepremičnin. Naš cilj je, da vam pomagamo najti sanjski dom ali popolno investicijo.
                        </span>
                        <div className="footer-social d-flex justify-content-center">
                            <div className="footer-social-item mx-2"><i className="fab fa-facebook"></i></div>
                            <div className="footer-social-item mx-2"><i className="fab fa-twitter"></i></div>
                            <div className="footer-social-item mx-2"><i className="fab fa-instagram"></i></div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6 text-center text-md-left">
                        <p className="footer-title">Kontakt</p>
                        <ul className="ul-margin-left footer-ul list-unstyled">
                            <li className="d-flex align-items-center my-2">
                                <div className="footer-info-item mr-2"><i className="fas fa-clock"></i></div> <span>08:00-16:00</span>
                            </li>
                            <li className="d-flex align-items-center my-2">
                                <div className="footer-info-item mr-2"><i className="fas fa-envelope"></i></div> <span>info@moje-nepremicnien.si</span>
                            </li>
                            <li className="d-flex align-items-center my-2">
                                <div className="footer-info-item mr-2"><i className="fas fa-map-marker-alt"></i></div> <span>Maribor</span>
                            </li>
                            <li className="d-flex align-items-center my-2">
                                <div className="footer-info-item mr-2"><i className="fas fa-phone-alt"></i></div> <span>0500 000 00 00</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;