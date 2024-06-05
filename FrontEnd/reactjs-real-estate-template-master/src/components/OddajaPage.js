import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import FlatItem from "./FlatItem";
import api from "../services/api";
import Filter from "./Filter";
import TuneIcon from "@mui/icons-material/Tune";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const OddajaPage = () => {
  const [nepremicnine, setNepremicnine] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = useQuery();
  const history = useHistory();
  const [page, setPage] = useState(parseInt(query.get("page")) || 1);
  const propertiesPerPage = 21;
  const [totalPages, setTotalPages] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [icon, setIcon] = useState("fa-filter");

  const filters = {
    posredovanje: "Oddaja",
    tip_nepremicnine: query.get("tip_nepremicnine") || "",
    lokacija: query.get("lokacija") || "",
    cenaMin: query.get("cenaMin") || "",
    cenaMax: query.get("cenaMax") || "",
    st_sob: query.get("st_sob") || "",
    st_spalnic: query.get("st_spalnic") || "",
    st_kopalnic: query.get("st_kopalnic") || "",
    leto_izgradnje: query.get("leto_izgradnje") || "",
    st_nadstropij: query.get("st_nadstropij") || "",
    velikost_zemljiscaMin: query.get("velikost_zemljiscaMin") || "",
    velikost_zemljiscaMax: query.get("velikost_zemljiscaMax") || "",
    velikost_skupajMin: query.get("velikost_skupajMin") || "",
    velikost_skupajMax: query.get("velikost_skupajMax") || "",
    agencija: query.get("agencija") || "",
    naziv: query.get("naziv") || "",
  };

  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([key, value]) => value !== "")
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/nepremicnine/filtri`, {
          params: {
            ...cleanFilters,
            page: page - 1,
            size: propertiesPerPage,
          },
        });
        setNepremicnine(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("There was an error fetching the nepremicnine!", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, JSON.stringify(cleanFilters)]); // Convert filters to a string to avoid re-renders

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      const newSearchParams = new URLSearchParams(cleanFilters);
      newSearchParams.set("page", newPage);
      history.push({
        pathname: "/nepremicnine/oddaja",
        search: `?${newSearchParams.toString()}`,
      });
    }
  };

  const translateFilterKey = (key) => {
    const translations = {
      posredovanje: "Posredovanje",
      tip_nepremicnine: "Tip nepremičnine",
      lokacija: "Lokacija",
      cenaMin: "Cena min",
      cenaMax: "Cena max",
      st_sob: "Št. sob",
      st_spalnic: "Št. spalnic",
      st_kopalnic: "Št. kopalnic",
      leto_izgradnje: "Leto izgradnje",
      st_nadstropij: "Št. nadstropij",
      velikost_zemljiscaMin: "Velikost zemljišča min",
      velikost_zemljiscaMax: "Velikost zemljišča max",
      velikost_skupajMin: "Velikost skupaj min",
      velikost_skupajMax: "Velikost skupaj max",
      agencija: "Agencija",
    };
    return translations[key] || key;
  };

  const removeFilter = (key) => {
    const newFilters = { ...cleanFilters };
    delete newFilters[key];
    const newSearchParams = new URLSearchParams(newFilters);
    newSearchParams.set("page", 1);
    history.push({
      pathname: "/nepremicnine/oddaja",
      search: `?${newSearchParams.toString()}`,
    });
    setPage(1);
  };

  const handleFilterButtonClick = () => {
    setShowFilter(!showFilter);
    setIcon(showFilter ? "fa-filter" : "fa-times");
  };

  const handleCloseFilter = () => {
    setShowFilter(false);
    setIcon("fa-filter");
  };

  const handleApplyFilters = (newFilters) => {
    const cleanNewFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([key, value]) => value !== "")
    );
    const newSearchParams = new URLSearchParams(cleanNewFilters);
    newSearchParams.set("page", 1);
    history.push({
      pathname: "/nepremicnine/oddaja",
      search: `?${newSearchParams.toString()}`,
    });
    setPage(1);
    setShowFilter(false);
    setIcon("fa-filter");
  };

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

  const activeFilters = Object.entries(cleanFilters).filter(
    ([key, value]) => value !== "" && key !== "posredovanje"
  );

  return (
    <section className="section-all-re">
      <div className="container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <h3 className="middle">ODDAJA</h3>
            <button
              className="btn-filter m-2"
              title="Filtriraj"
              onClick={handleFilterButtonClick}
              style={{ outline: "none" }}
            >
              <TuneIcon />
            </button>
            {showFilter && (
              <Filter
                filters={filters}
                onClose={handleCloseFilter}
                onApply={handleApplyFilters}
              />
            )}
            <div className="container mb-4">
              <div className="row">
                <div className="col-lg-12">
                  <div className="filter-container">
                    {activeFilters.map(([key, value]) => (
                      <span key={key} className="filtri-badge">
                        {`${translateFilterKey(key)}: ${value}`}{" "}
                        <i
                          className="fa fa2 fa-times"
                          aria-hidden="true"
                          onClick={() => removeFilter(key)}
                          style={{ cursor: "pointer", marginLeft: "5px" }}
                        ></i>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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

export default OddajaPage;
