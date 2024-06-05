import { useEffect, useState } from "react";
import banner from "../banner.jpg";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import FlatList from "./FlatList";
import TuneIcon from '@mui/icons-material/Tune';


const Banner = () => {
  const [search, setSearch] = useState([]);
  const [find, setFind] = useState([]);
  const [word, setWord] = useState("");
  const [showFilter, setShowFilter] = useState(false); // State for managing the Filter visibility
  const [icon, setIcon] = useState("fa-filter"); // State for managing the icon
  const [selectedButton, setSelectedButton] = useState("prodaja"); // State for managing the selected button

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
  });

  const findSearch = (e) => {
    setWord(e.target.value);
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
    setFilters(newFilters);
    setShowFilter(false);
    setIcon("fa-filter");
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
                  <div className="button-group mb-3 d-flex justify-content-start">
                    <button
                      className={`btn mx-2 ${
                        selectedButton === "prodaja"
                          ? "btn-primary"
                          : "btn-secondary"
                      }`}
                      onClick={() => handleButtonClick("prodaja")}
                    >
                      Prodaja
                    </button>
                    <button
                      className={`btn mx-2 ${
                        selectedButton === "oddaja"
                          ? "btn-primary"
                          : "btn-secondary"
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
                        <TuneIcon />
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
