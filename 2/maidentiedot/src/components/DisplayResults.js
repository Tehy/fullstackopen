import React from "react";
import Buttons from "./Buttons";
import Weather from "./Weather";

const DisplayResults = (props) => {
  const filter = props.filter;
  const filtered = props.data.filter((country) =>
    country.name.toLowerCase().includes(filter)
  );
  return (
    <>
      {filter === "" ? (
        <></>
      ) : filtered.length > 10 ? (
        <p>Too many matches, spesicfy your search</p>
      ) : filtered.length === 1 ? (
        <>
          <p />
          <h2>{filtered[0].name}</h2>
          <h3>Capital </h3>
          <p>{filtered[0].capital}</p>
          <h3>Population </h3>
          <p>{filtered[0].population}</p>
          <h3>Languages </h3>
          <ul>
            {filtered[0].languages.map((lang) => (
              <li>{lang.name}</li>
            ))}
          </ul>
          <img src={filtered[0].flag} height={150} />
          <Weather country={filtered[0]} />
        </>
      ) : (
        <Buttons countries={filtered} />
      )}
    </>
  );
};
export default DisplayResults;
