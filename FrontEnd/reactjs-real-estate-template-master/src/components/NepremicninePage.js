import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import FlatItem from "./FlatItem";
import api from "../services/api";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const NepremicninePage = () => {
  const [nepremicnine, setNepremicnine] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = useQuery();
  const history = useHistory();
  const [page, setPage] = useState(parseInt(query.get("page")) || 1);
  const propertiesPerPage = 21;
  const [steviloVseh, setSteviloVseh] = useState(0);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/nepremicnine/vrniGledeNaStran?page=${page - 1}`)
      .then((response) => {
        setNepremicnine(response.data);
        setLoading(false);
        api.get("/nepremicnine/steviloVseh").then((response) => {
          setSteviloVseh(response.data);
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the nepremicnine!", error);
        setLoading(false);
      });
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      setPage(newPage);
      history.push(`/nepremicnine?page=${newPage}`);
    }
  };

  const totalPages = Math.ceil(steviloVseh / propertiesPerPage); // Assuming the API provides the total count

  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pages.push(
        <li key={1} className="page-item">
          <button onClick={() => handlePageChange(1)} className="page-link">
            1
          </button>
        </li>
      );
      if (startPage > 2) {
        pages.push(
          <li key="ellipsis-start" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${i === page ? "active" : ""}`}>
          <button onClick={() => handlePageChange(i)} className="page-link">
            {i}
          </button>
        </li>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <li key="ellipsis-end" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
      pages.push(
        <li key={totalPages} className="page-item">
          <button
            onClick={() => handlePageChange(totalPages)}
            className="page-link"
          >
            {totalPages}
          </button>
        </li>
      );
    }

    return pages;
  };

  return (
    <section className="section-all-re">
      <div className="container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <ul className="row">
              {nepremicnine.map((nepremicnina) => (
                <FlatItem
                  key={nepremicnina.id_nepremicnine}
                  nepremicnina={nepremicnina}
                />
              ))}
            </ul>
            <ul className="pagination justify-content-center">
              {renderPagination()}
            </ul>
          </>
        )}
      </div>
    </section>
  );
};

export default NepremicninePage;
