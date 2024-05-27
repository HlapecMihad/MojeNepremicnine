import Title from "./Title";
import FlatItem from "./FlatItem";
import React, { useEffect, useState } from 'react';
import api from "../services/api";

const FlatList = () => {
    const title = {
        text: "NASLOV",
        description: "Text"
    }

    const [nepremicnine, setNepremicnine] = useState([]);
    const [trenutnaStran, setTrenutnaStran] = useState(1);
    const [propertiesPerPage] = useState(12);

    
    useEffect(() => {
        api.get('/nepremicnine/vseNepremicnine')
            .then(response => {
                setNepremicnine(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the nepremicnine!", error);
            });
    }, []);

    const indexOfLastProperty = trenutnaStran * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = nepremicnine.slice(indexOfFirstProperty, indexOfLastProperty);

    const paginate = (pageNumber) => setTrenutnaStran(pageNumber);

    return (
        <section className="section-all-re">
            <div className="container">
                <Title title={title.text} description={title.description} />
                <ul className="row">
                    {currentProperties.map(nepremicnina => (
                        <FlatItem key={nepremicnina.id} nepremicnina={nepremicnina} />
                    ))}
                </ul>

                <ul className="pagination justify-content-center"> 
                    {Array.from({ length: Math.ceil(nepremicnine.length / propertiesPerPage) }).map((_, index) => (
                        <li key={index} className={`page-item ${index + 1 === trenutnaStran ? 'active' : ''}`}> 
                            <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default FlatList;
