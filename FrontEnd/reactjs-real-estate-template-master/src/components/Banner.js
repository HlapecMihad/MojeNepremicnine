import { useEffect, useState } from "react";
import banner from "../banner.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
  const [search, setSearch] = useState();
  const [find, setFind] = useState([]);
  const [word, setWord] = useState("");

  const findSearch = (e) => {
    setWord(e.target.value);
  };

  return (
    <div
      className="banner d-flex align-items-center"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="bg-custom">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <div className="banner-area text-center pt-4 pb-4">
                <p>Text</p>
                <h2 className="mt-2 mb-4 banner-title">
                  <strong> NASLOV</strong>{" "}
                </h2>
                <div className="search-area">
                  <Link
                    className="btn-filter m-2"
                    to="/filtri"
                    title="Filtriraj"
                  >
                    <i class="fa fa-filter" aria-hidden="true"></i>
                  </Link>
                  <input
                    value={word}
                    onChange={(e) => findSearch(e)}
                    type="text"
                    className="inp-search"
                    placeholder="Išči..."
                  />
                  <Link to={`/searchResult?naziv=${word}`}>
                    <button className="btn-search m-2">Išči</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
