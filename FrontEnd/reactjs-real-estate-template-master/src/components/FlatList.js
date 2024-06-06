import React, { useEffect, useState } from "react";
import FlatItem from "./FlatItem";
import api from "../services/api";
import { Link } from "react-router-dom";

const FlatList = () => {
  const [nepremicnine, setNepremicnine] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    api
      .get(`/nepremicnine/prvihDvanajst?page=${page}`)
      .then((response) => {
        setNepremicnine(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the nepremicnine!", error);
      });
  }, [page]);

  return (
    <section className="section-all-re">
      <h2 className="middle fontOptions">Zadnje dodani oglasi</h2>
      <div className="container">
        <ul className="row">
          {nepremicnine.map((nepremicnina) => (
            <FlatItem
              key={nepremicnina.id_nepremicnine}
              nepremicnina={nepremicnina}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FlatList;
