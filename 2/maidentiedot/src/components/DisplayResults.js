import React from "react";
import Buttons from "./Buttons";

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
      ) : (
        <Buttons countries={filtered} />
      )}
    </>
  );
};
export default DisplayResults;
