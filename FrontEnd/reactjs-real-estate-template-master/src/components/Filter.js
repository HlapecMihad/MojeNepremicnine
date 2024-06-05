import React, { useState, useEffect } from "react";

const Filter = ({ filters, onClose, onApply }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleInputChange = (event, field, isNumber = false) => {
    const { value } = event.target;
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [field]: isNumber ? (value !== "" ? Number(value) : null) : value,
    }));
  };

  const handleSelectChange = (event, field) => {
    const { value } = event.target;
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const handleApplyClick = () => {
    onApply(localFilters);
    console.log(localFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      posredovanje: "",
      tip_nepremicnine: "",
      lokacija: "",
      cenaMin: "",
      cenaMax: "",
      st_sob: "",
      st_spalnic: "",
      st_kopalnic: "",
      leto_izgradnje: "",
      st_nadstropij: "",
      velikost_zemljiscaMin: "",
      velikost_zemljiscaMax: "",
      velikost_skupajMin: "",
      velikost_skupajMax: "",
      agencija: "",
    };
    setLocalFilters(clearedFilters);
    onApply(clearedFilters);
  };

  return (
    <div className="filtri container mt-2">
      <h1>Filter</h1>
      {/*<div>
                <label>Posredovanje</label>
                <select
                    value={localFilters.posredovanje}
                    onChange={(e) => handleSelectChange(e, "posredovanje")}
                >
                    <option value="">--- Izberite ---</option>
                    <option value="Prodaja">Prodaja</option>
                    <option value="Oddaja">Oddaja</option>
                </select>
    </div>*/}
      <div>
        <label>Tip nepremičnine</label>
        <select
          value={localFilters.tip_nepremicnine}
          onChange={(e) => handleSelectChange(e, "tip_nepremicnine")}
        >
          <option value="">--- Izberite ---</option>
          <option value="Stanovanje">Stanovanje</option>
          <option value="Hiša">Hiša</option>
          <option value="Soba">Soba</option>
          <option value="Poslovni prostor">Poslovni prostor</option>
          <option value="Počitniški objekt">Počitniški objekt</option>
          <option value="Zemljišče">Zemljišče</option>
          <option value="Garaža/Parkirno mesto">Garaža/Parkirno mesto</option>
          <option value="Klet">Klet</option>
          <option value="Trgovine in restavracije/pub/gostilne">
            Trgovine in restavracije/pub/gostilne
          </option>
          <option value="Industrijski objekt">Industrijski objekt</option>
          <option value="Investicijske nepremičnine">
            Investicijske nepremičnine
          </option>
          <option value="Drugo">Drugo</option>
        </select>
      </div>
      <div>
        <label>Lokacija</label>
        <select
          value={localFilters.lokacija}
          onChange={(e) => handleSelectChange(e, "lokacija")}
        >
          <option value="">--- Izberite lokacijo ---</option>
          <option value="Ajdovščina">Ajdovščina</option>
          <option value="Beltinci">Beltinci</option>
          <option value="Bled">Bled</option>
          <option value="Bohinj">Bohinj</option>
          <option value="Borovnica">Borovnica</option>
          <option value="Bovec">Bovec</option>
          <option value="Braslovče">Braslovče</option>
          <option value="Brda">Brda</option>
          <option value="Brezovica">Brezovica</option>
          <option value="Brežice">Brežice</option>
          <option value="Celje">Celje</option>
          <option value="Cerklje na Gorenjskem">Cerklje na Gorenjskem</option>
          <option value="Cerknica">Cerknica</option>
          <option value="Cerkno">Cerkno</option>
          <option value="Črnomelj">Črnomelj</option>
          <option value="Domžale">Domžale</option>
          <option value="Dravograd">Dravograd</option>
          <option value="Gornja Radgona">Gornja Radgona</option>
          <option value="Grosuplje">Grosuplje</option>
          <option value="Hrastnik">Hrastnik</option>
          <option value="Idrija">Idrija</option>
          <option value="Ig">Ig</option>
          <option value="Ilirska Bistrica">Ilirska Bistrica</option>
          <option value="Izola">Izola</option>
          <option value="Jesenice">Jesenice</option>
          <option value="Kamnik">Kamnik</option>
          <option value="Kanal ob Soči">Kanal ob Soči</option>
          <option value="Kidričevo">Kidričevo</option>
          <option value="Kobarid">Kobarid</option>
          <option value="Komen">Komen</option>
          <option value="Koper">Koper</option>
          <option value="Kočevje">Kočevje</option>
          <option value="Kranj">Kranj</option>
          <option value="Krško">Krško</option>
          <option value="Laško">Laško</option>
          <option value="Lenart">Lenart</option>
          <option value="Lendava">Lendava</option>
          <option value="Litija">Litija</option>
          <option value="Ljubljana">Ljubljana</option>
          <option value="Ljubno">Ljubno</option>
          <option value="Ljutomer">Ljutomer</option>
          <option value="Logatec">Logatec</option>
          <option value="Loška dolina">Loška dolina</option>
          <option value="Lukovica">Lukovica</option>
          <option value="Maribor">Maribor</option>
          <option value="Medvode">Medvode</option>
          <option value="Metlika">Metlika</option>
          <option value="Mežica">Mežica</option>
          <option value="Mislinja">Mislinja</option>
          <option value="Moravske Toplice">Moravske Toplice</option>
          <option value="Mozirje">Mozirje</option>
          <option value="Murska Sobota">Murska Sobota</option>
          <option value="Nova Gorica">Nova Gorica</option>
          <option value="Novo Mesto">Novo Mesto</option>
          <option value="Ormož">Ormož</option>
          <option value="Piran">Piran</option>
          <option value="Pivka">Pivka</option>
          <option value="Podčetrtek">Podčetrtek</option>
          <option value="Postojna">Postojna</option>
          <option value="Prebold">Prebold</option>
          <option value="Ptuj">Ptuj</option>
          <option value="Radlje ob Dravi">Radlje ob Dravi</option>
          <option value="Radovljica">Radovljica</option>
          <option value="Ravne na Koroškem">Ravne na Koroškem</option>
          <option value="Ribnica">Ribnica</option>
          <option value="Rogaška Slatina">Rogaška Slatina</option>
          <option value="Rogašovci">Rogašovci</option>
          <option value="Rogatec">Rogatec</option>
          <option value="Ruše">Ruše</option>
          <option value="Sevnica">Sevnica</option>
          <option value="Sežana">Sežana</option>
          <option value="Slovenj Gradec">Slovenj Gradec</option>
          <option value="Slovenska Bistrica">Slovenska Bistrica</option>
          <option value="Slovenske Konjice">Slovenske Konjice</option>
          <option value="Šentjur">Šentjur</option>
          <option value="Škofja Loka">Škofja Loka</option>
          <option value="Šoštanj">Šoštanj</option>
          <option value="Štore">Štore</option>
          <option value="Tolmin">Tolmin</option>
          <option value="Trbovlje">Trbovlje</option>
          <option value="Trebnje">Trebnje</option>
          <option value="Tržič">Tržič</option>
          <option value="Turnišče">Turnišče</option>
          <option value="Velenje">Velenje</option>
          <option value="Velike Lašče">Velike Lašče</option>
          <option value="Vipava">Vipava</option>
          <option value="Vitanje">Vitanje</option>
          <option value="Vodice">Vodice</option>
          <option value="Vrhnika">Vrhnika</option>
          <option value="Vuzenica">Vuzenica</option>
          <option value="Zagorje ob Savi">Zagorje ob Savi</option>
          <option value="Zavrč">Zavrč</option>
          <option value="Zreče">Zreče</option>
          <option value="Železniki">Železniki</option>
          <option value="Žiri">Žiri</option>
          <option value="Žužemberk">Žužemberk</option>
        </select>
      </div>
      <div className="range-group">
        <div>
          <label>Cena (min - max)</label>
          <input
            type="number"
            placeholder="Min"
            value={localFilters.cenaMin || ""}
            onChange={(e) => handleInputChange(e, "cenaMin", true)}
          />
          <input
            type="number"
            placeholder="Max"
            value={localFilters.cenaMax || ""}
            onChange={(e) => handleInputChange(e, "cenaMax", true)}
          />
        </div>
      </div>
      <div>
        <label>Število sob</label>
        <input
          type="number"
          value={localFilters.st_sob || ""}
          onChange={(e) => handleInputChange(e, "st_sob", true)}
        />
      </div>
      <div>
        <label>Število spalnic</label>
        <input
          type="number"
          value={localFilters.st_spalnic || ""}
          onChange={(e) => handleInputChange(e, "st_spalnic", true)}
        />
      </div>
      <div>
        <label>Število kopalnic</label>
        <input
          type="number"
          value={localFilters.st_kopalnic || ""}
          onChange={(e) => handleInputChange(e, "st_kopalnic", true)}
        />
      </div>
      <div>
        <label>Leto izgradnje</label>
        <input
          type="number"
          value={localFilters.leto_izgradnje || ""}
          onChange={(e) => handleInputChange(e, "leto_izgradnje", true)}
        />
      </div>
      <div>
        <label>Število nadstropij</label>
        <input
          type="number"
          value={localFilters.st_nadstropij || ""}
          onChange={(e) => handleInputChange(e, "st_nadstropij", true)}
        />
      </div>
      <div className="range-group">
        <div>
          <label>
            Velikost zemljišča m<sup>2</sup>&nbsp; (min - max)
          </label>
          <input
            type="number"
            placeholder="Min"
            value={localFilters.velikost_zemljiscaMin || ""}
            onChange={(e) =>
              handleInputChange(e, "velikost_zemljiscaMin", true)
            }
          />
          <input
            type="number"
            placeholder="Max"
            value={localFilters.velikost_zemljiscaMax || ""}
            onChange={(e) =>
              handleInputChange(e, "velikost_zemljiscaMax", true)
            }
          />
        </div>
      </div>
      <div className="range-group">
        <div>
          <label>
            Velikost skupaj m<sup>2</sup>&nbsp; (min - max)
          </label>
          <input
            type="number"
            placeholder="Min"
            value={localFilters.velikost_skupajMin || ""}
            onChange={(e) => handleInputChange(e, "velikost_skupajMin", true)}
          />
          <input
            type="number"
            placeholder="Max"
            value={localFilters.velikost_skupajMax || ""}
            onChange={(e) => handleInputChange(e, "velikost_skupajMax", true)}
          />
        </div>
      </div>
      <div>
        <label>Agencija</label>
        <select
          value={localFilters.agencija}
          onChange={(e) => handleSelectChange(e, "agencija")}
        >
          <option value="">--- Izberite ---</option>
          <option value="21Century">21Century</option>
          <option value="Re-Max">Re-Max</option>
          <option value="Drugo">Drugo</option>
        </select>
      </div>
      <div className="button-group">
        <button className="btn-apply" onClick={onClose}>
          Zapri
        </button>
        <button className="btn-apply" onClick={handleClearFilters}>
          Odstrani filtre
        </button>
        <button className="btn-apply" onClick={handleApplyClick}>
          Uporabi filtre
        </button>
      </div>
    </div>
  );
};

export default Filter;
