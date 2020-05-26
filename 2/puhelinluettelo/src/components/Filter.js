import React from "react";

const Filter = (props) => {
  return (
    <>
      filter: <input value={props.filter} onChange={props.filterChange} />
    </>
  );
};
export default Filter;
