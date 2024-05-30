import React from "react"

const Footer = () => {
    return (
        <section className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <i className="fas fa-home"></i>
                        <span className="footer-other-text d-block mt-3 mb-3">
                            Smo podjetje, specializirano za prodajo nepremičnin. Naš cilj je, da vam pomagamo najti sanjski dom ali popolno investicijo.
                        </span>
                        <div className="footer-social">
                            <div className="footer-social-item"><i className="fab fa-facebook"></i></div>
                            <div className="footer-social-item"><i className="fab fa-twitter"></i></div>
                            <div className="footer-social-item"><i className="fab fa-instagram"></i></div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <p className="footer-title">Meni</p>
                        <ul className="footer-ul">
                            <li>Domov</li>
                            <li>Blog</li>
                            <li>O nas</li>
                            <li>Kontakt</li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div>
                            <p className="footer-title">Kategorije</p>
                            <ul className="footer-ul">
                                <li>Kategorija 1</li>
                                <li>Kategorija 2</li>
                                <li>Kategorija 3</li>
                                <li>Kategorija 4</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <p className="footer-title">Kontakt</p>
                        <ul className="footer-ul">
                            <li className="d-flex">
                                <div className="footer-info-item"><i className="fas fa-clock"></i></div> <span>08:00-16:00</span>
                            </li>
                            <li className="d-flex">
                                <div className="footer-info-item"><i className="fas fa-envelope"></i></div> <span>info@moje-nepremicnien.si</span>
                            </li>
                            <li className="d-flex">
                                <div className="footer-info-item"><i className="fas fa-map-marker-alt"></i></div> <span>Maribor</span>
                            </li>
                            <li className="d-flex">
                                <div className="footer-info-item"><i className="fas fa-phone-alt"></i></div> <span>0500 000 00 00</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer