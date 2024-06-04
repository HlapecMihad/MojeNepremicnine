import React, { useContext, useEffect, useState } from "react";
import FlatItem from "./FlatItem";
import api from "../services/api";
import { NepremicnineContext } from "../other/NepremicnineContext";

const FlatList = () => {
  const { nepremicnine, addNepremicnine } = useContext(NepremicnineContext);
  const [trenutnaStran, setTrenutnaStran] = useState(1);
  const [propertiesPerPage] = useState(12);

  useEffect(() => {
    api
      .get("/nepremicnine/vseNepremicnine")
      .then((response) => {
        addNepremicnine(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the nepremicnine!", error);
      });
  }, [addNepremicnine]);

  const indexOfLastProperty = trenutnaStran * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = nepremicnine.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const paginate = (pageNumber) => setTrenutnaStran(pageNumber);

  return (
    <section className="section-all-re">
      <div className="container">
        <ul className="row">
          {currentProperties.map((nepremicnina) => (
            <FlatItem key={nepremicnina.id} nepremicnina={nepremicnina} />
          ))}
        </ul>
        <ul className="pagination justify-content-center">
          {Array.from({
            length: Math.ceil(nepremicnine.length / propertiesPerPage),
          }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                index + 1 === trenutnaStran ? "active" : ""
              }`}
            >
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FlatList;
