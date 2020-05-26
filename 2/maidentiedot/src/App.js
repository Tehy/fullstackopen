import React, { useState, useEffect } from "react";
import DisplayResults from "./components/DisplayResults";
import axios from "axios";

const App = () => {
  const [newSearch, setNewSearch] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((resp) => {
      setData(resp.data);
    });
  }, []);
  const handleChange = (e) => {
    setNewSearch(e.target.value);
  };
  return (
    <div>
      find countries <input value={newSearch} onChange={handleChange} />
      <DisplayResults data={data} filter={newSearch} />
    </div>
  );
};
export default App;
