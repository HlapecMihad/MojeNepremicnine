import { useEffect, useState } from "react";
import banner from "../banner.jpg";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import TuneIcon from "@mui/icons-material/Tune";
import FlatList from "./FlatList";
import api from "../services/api";

const Banner = () => {
  const [search, setSearch] = useState([]);
  const [find, setFind] = useState([]);
  const [word, setWord] = useState("");
  const [showFilter, setShowFilter] = useState(false); // State for managing the Filter visibility
  const [selectedButton, setSelectedButton] = useState("prodaja"); // State for managing the selected button
  const [count, setCount] = useState(0); // State for managing the count

  // Filter state
  const [filters, setFilters] = useState({
    posredovanje: "",
    tip_nepremicnine: "",
    lokacija: "",
    cenaMin: null,
    cenaMax: null,
    st_sob: null,
    st_spalnic: null,
    st_kopalnic: null,
    leto_izgradnje: null,
    st_nadstropij: null,
    velikost_zemljiscaMin: null,
    velikost_zemljiscaMax: null,
    velikost_skupajMin: null,
    velikost_skupajMax: null,
    agencija: "",
    naziv: "", // Add the search term to the filters state
  });

  const findSearch = (e) => {
    setWord(e.target.value);
  };

  const handleFilterButtonClick = () => {
    setShowFilter(!showFilter);
  };

  const handleCloseFilter = () => {
    setShowFilter(false);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setShowFilter(false);
  };

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const createFilterQueryString = () => {
    const query = Object.entries(filters)
      .filter(([key, value]) => value !== "" && value !== null)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
    return query;
  };

  useEffect(() => {
    api
      .get("/nepremicnine/count")
      .then((response) => {
        setCount(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the nepremicnine!", error);
      });
  }, []);

  useEffect(() => {
    // Update the naziv filter when the search word changes
    setFilters((prevFilters) => ({
      ...prevFilters,
      naziv: word,
    }));
  }, [word]);

  return (
    <div>
      <div
        className="banner d-flex align-items-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="bg-custom">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mx-auto">
                <div className="banner-area text-center pt-4 pb-4">
                  <h2 className="mt-2 mb-4 banner-title">
                    <strong>Moje Nepremičnine</strong>
                  </h2>
                  <p>
                    Trenutno lahko iščete med {count} nepremičninami v Sloveniji
                  </p>

                  <div className="button-group mb-1 d-flex justify-content-start">
                    <button
                      className={` ${
                        selectedButton === "prodaja"
                          ? "btn-prodaja"
                          : "btn-oddaja"
                      }`}
                      onClick={() => handleButtonClick("prodaja")}
                    >
                      Prodaja
                    </button>
                    <button
                      className={` ${
                        selectedButton === "oddaja"
                          ? "btn-prodaja"
                          : "btn-oddaja"
                      }`}
                      onClick={() => handleButtonClick("oddaja")}
                    >
                      Oddaja
                    </button>
                  </div>
                  <div className="search-area d-flex align-items-center">
                    <button
                      className="btn-filter m-2"
                      title="Filtriraj"
                      onClick={handleFilterButtonClick}
                      style={{ outline: "none" }}
                    >
                      {showFilter ? (
                        <i className="fa fa-times" aria-hidden="true"></i>
                      ) : (
                        <TuneIcon />
                      )}
                    </button>
                    <input
                      value={word}
                      onChange={(e) => findSearch(e)}
                      type="text"
                      className="inp-search"
                      placeholder="Išči..."
                    />
                    <Link
                      to={`/nepremicnine/${selectedButton}?${createFilterQueryString()}`}
                    >
                      <button className="btn-search m-2">Išči</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showFilter && (
        <Filter
          filters={filters}
          onClose={handleCloseFilter}
          onApply={handleApplyFilters}
        />
      )}
      <FlatList filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default Banner;
