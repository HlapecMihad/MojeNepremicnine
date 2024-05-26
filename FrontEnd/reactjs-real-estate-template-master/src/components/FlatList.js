import Title from "./Title"
import FlatItem from "./FlatItem"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FlatList = () => {
    const title = {
        text: "NASLOV",
        description: "Text"
    }

    const [nepremicnine, setNepremicnine] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:8080/api/nepremicnine')
        .then(response => {
          setNepremicnine(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the nepremicnine!", error);
        });
    }, []);

    return (
        <section className="section-all-re">
            <div className="container">
                <Title title={title.text} description={title.description} />
                <ul className="row">
                 {nepremicnine.map(nepremicnina => (
                      <FlatItem key={nepremicnina.id} nepremicnina={nepremicnina} />
                ))}
                </ul>
            </div>
        </section>
    )
}

export default FlatList;
