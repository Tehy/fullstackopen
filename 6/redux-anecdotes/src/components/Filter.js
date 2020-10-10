import React from "react";
import { applyFilter } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";
const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const filterTerm = event.target.value;
    dispatch(applyFilter(filterTerm));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
