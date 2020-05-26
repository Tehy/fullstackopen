import React, { useState } from "react";
import Weather from "./Weather";

const Buttons = (props) => {
  const [single, setSingle] = useState();
  const [showSingle, setShowSingle] = useState(false);

  const countries = props.countries;

  return showSingle != true ? (
    countries.map((country) => (
      <p key={country.name}>
        {country.name}
        <button
          onClick={() => {
            setSingle(country);
            setShowSingle(!single);
          }}
        >
          show
        </button>
      </p>
    ))
  ) : (
    <>
      <p />
      <button
        onClick={() => {
          setSingle();
          setShowSingle(!single);
        }}
      >
        go back
      </button>
      <h2>{single.name}</h2>
      <h3>Capital </h3>
      <p>{single.capital}</p>
      <h3>Population </h3>
      <p>{single.population}</p>
      <h3>Languages </h3>
      <ul>
        {single.languages.map((lang) => (
          <li>{lang.name}</li>
        ))}
      </ul>
      <img src={single.flag} height={150} />
      <Weather country={single} />
    </>
  );
};
export default Buttons;
