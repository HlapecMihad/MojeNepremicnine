import Levenshtein from "levenshtein";
import FlatItem from "./FlatItem";
import React, { useState, useContext } from "react";
import { NepremicnineContext } from "../other/NepremicnineContext";
import { useLocation } from "react-router-dom";

const SearchResult = () => {
  const { nepremicnine } = useContext(NepremicnineContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("naziv");

  const getMatchScore = (item, term) => {
    const levenshteinDistance = new Levenshtein(
      item.naziv.toLowerCase(),
      term.toLowerCase()
    ).distance;
    const includesTerm = item.naziv.toLowerCase().includes(term.toLowerCase());
    return includesTerm ? -levenshteinDistance : levenshteinDistance;
  };

  const filteredAndSortedItems = nepremicnine
    .map((item) => ({
      ...item,
      matchScore: getMatchScore(item, searchTerm),
    }))
    .sort((a, b) => a.matchScore - b.matchScore)
    .slice(0, 21);

  return (
    <>
      <div style={{ textAlign: "center", fontSize: "24px", marginTop: "20px" }}>
        Rezultati za: <strong>{searchTerm}</strong>
      </div>
      <section className="section-all-re">
        <div className="container">
          <ul className="row">
            {filteredAndSortedItems.map((nepremicnina) => (
              <FlatItem key={nepremicnina.id} nepremicnina={nepremicnina} />
            ))}
          </ul>
        </div>
      </section>{" "}
    </>
  );
};

export default SearchResult;
