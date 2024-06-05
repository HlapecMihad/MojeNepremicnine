import React, { useContext, useState } from "react";
import { ComparisonContext } from "../other/ComparisonContext";
import { Link } from "react-router-dom";

const ComparisonPage = () => {
  const { comparisonList, removeFromComparison } =
    useContext(ComparisonContext);
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  if (comparisonList.length === 0) {
    return (
      <div className="comparison-page">
        <h1 className="middle">Primerjava nepremičnin</h1>
        <p className="middle1">Nobena nepremičnina ni bila izbrana.</p>
      </div>
    );
  }

  const toggleHighlight = () => {
    setHighlightDifferences(!highlightDifferences);
  };

  const attributeDiffers = (attr) => {
    const values = comparisonList.map((item) => item[attr]);
    return new Set(values).size !== 1;
  };

  const listAttributeDiffers = (list) => {
    const allItems = new Set(comparisonList.flatMap((item) => item[list]));
    return Array.from(allItems).map((feature) => ({
      feature,
      differs: comparisonList.some((item) => !item[list].includes(feature)),
    }));
  };

  const renderValue = (value) => (value === null ? "Ni na voljo" : value);

  const attributeNames = {
    posredovanje: "Posredovanje",
    tip_nepremicnine: "Tip nepremičnine",
    lokacija: "Lokacija",
    st_sob: "Število sob",
    cena: "Cena",
    st_spalnic: "Število spalnic",
    st_kopalnic: "Število kopalnic",
    leto_izgradnje: "Leto izgradnje",
    st_nadstropij: "Število nadstropij",
    velikost_zemljisca: "Velikost zemljišča",
    velikost_skupaj: "Velikost skupaj",
    opis: "Opis",
    leto_obnove: "Leto obnove",
    agencija: "Agencija",
    lastnosti: "Lastnosti",
  };

  return (
    <div className="comparison-page">
      <h1 className="middle">Primerjava nepremičnin</h1>

      <div className="comparison-table">
        <table className="table table-bordered comparison-table-fixed">
          <thead>
            <tr>
              <th className="attribute-column special-moj">
                <button
                  onClick={toggleHighlight}
                  className="toggle-highlight-button middle center-moj"
                >
                  {highlightDifferences ? "Skrij razlike" : "Prikaži razlike"}
                </button>
              </th>
              {comparisonList.map((item) => (
                <th key={item.id} className="comparison-column">
                  <div className="property-header">
                    <img
                      src={item.image_urls[0]}
                      alt={item.naziv}
                      width="100"
                    />
                    <Link
                      to={{
                        pathname: `/nepremicnina/${item.id}`,
                        state: { nepremicnina: item },
                      }}
                    >
                      <h3>{item.naziv}</h3>
                    </Link>
                    <button onClick={() => removeFromComparison(item.id)}>
                      Odstrani
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(attributeNames).map((attr) => {
              if (attr === "lastnosti") {
                return (
                  <tr key={attr}>
                    <td className="attribute-column">{attributeNames[attr]}</td>
                    {comparisonList.map((item) => (
                      <td key={item.id} className="comparison-column">
                        {listAttributeDiffers("lastnosti").map(
                          ({ feature, differs }) => (
                            <div key={feature}>
                              {item.lastnosti.includes(feature) &&
                                (highlightDifferences && differs ? (
                                  <strong>{feature}</strong>
                                ) : (
                                  feature
                                ))}
                            </div>
                          )
                        )}
                      </td>
                    ))}
                  </tr>
                );
              } else {
                return (
                  <tr key={attr}>
                    <td className="attribute-column">{attributeNames[attr]}</td>
                    {comparisonList.map((item) => (
                      <td key={item.id} className="comparison-column">
                        {highlightDifferences && attributeDiffers(attr) ? (
                          <strong>{renderValue(item[attr])}</strong>
                        ) : (
                          renderValue(item[attr])
                        )}
                      </td>
                    ))}
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonPage;
