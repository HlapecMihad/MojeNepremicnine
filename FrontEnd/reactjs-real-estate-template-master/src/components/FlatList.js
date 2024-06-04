import React, { useContext, useEffect, useState } from "react";
import FlatItem from "./FlatItem";
import api from "../services/api";
import { NepremicnineContext } from "../other/NepremicnineContext";

const FlatList = ({ filters = {} }) => {
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

  const applyFilters = (properties) => {
    return properties.filter((property) => {
      const cena = parseFloat(property.cena.replace(/[.,]/g, ""));
      const velikostSkupaj = parseFloat(
        property.velikost_skupaj.split(" ")[0].replace(",", ".")
      );
      const velikostZemljisca = parseFloat(
        property.velikost_zemljisca.split(" ")[0].replace(",", ".")
      );
      const lokacijaDel = property.lokacija.split(", ")[0];

      if (
        filters.posredovanje &&
        property.posredovanje !== filters.posredovanje
      )
        return false;
      if (
        filters.tip_nepremicnine &&
        property.tip_nepremicnine !== filters.tip_nepremicnine
      )
        return false;
      if (filters.lokacija && lokacijaDel !== filters.lokacija) return false;
      if (filters.cenaMin !== null && cena < filters.cenaMin) return false;
      if (filters.cenaMax !== null && cena > filters.cenaMax) return false;
      if (filters.st_sob !== null && property.st_sob !== filters.st_sob)
        return false;
      if (
        filters.st_spalnic !== null &&
        property.st_spalnic !== filters.st_spalnic
      )
        return false;
      if (
        filters.st_kopalnic !== null &&
        property.st_kopalnic !== filters.st_kopalnic
      )
        return false;
      if (
        filters.leto_izgradnje !== null &&
        property.leto_izgradnje !== filters.leto_izgradnje
      )
        return false;
      if (
        filters.st_nadstropij !== null &&
        property.st_nadstropij !== filters.st_nadstropij
      )
        return false;
      if (
        filters.velikost_zemljiscaMin !== null &&
        velikostZemljisca < filters.velikost_zemljiscaMin
      )
        return false;
      if (
        filters.velikost_zemljiscaMax !== null &&
        velikostZemljisca > filters.velikost_zemljiscaMax
      )
        return false;
      if (
        filters.velikost_skupajMin !== null &&
        velikostSkupaj < filters.velikost_skupajMin
      )
        return false;
      if (
        filters.velikost_skupajMax !== null &&
        velikostSkupaj > filters.velikost_skupajMax
      )
        return false;
      if (filters.agencija === "21Century" && property.agencija !== "21Century")
        return false;
      if (filters.agencija === "Re-Max" && property.agencija !== "Re-Max")
        return false;
      if (
        filters.agencija === "Drugo" &&
        (property.agencija === "21Century" || property.agencija === "Re-Max")
      )
        return false;
      return true;
    });
  };

  const filteredProperties = applyFilters(nepremicnine);
  const indexOfLastProperty = trenutnaStran * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const paginate = (pageNumber) => setTrenutnaStran(pageNumber);

  return (
    <section className="section-all-re">
      <div className="container">
        <ul className="row">
          {currentProperties.map((nepremicnina) => (
            <FlatItem
              key={nepremicnina.id_nepremicnine}
              nepremicnina={nepremicnina}
            />
          ))}
        </ul>

        <ul className="pagination justify-content-center">
          {Array.from({
            length: Math.ceil(filteredProperties.length / propertiesPerPage),
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
