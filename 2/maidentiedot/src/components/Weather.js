import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = (props) => {
  const [data, setData] = useState();
  const key = process.env.REACT_APP_API_KEY;
  const country = props.country;
  const url = `http://api.weatherstack.com/current?access_key=${key}&query=${country.name}`;

  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data);
      console.log("response.data", response.data);
    });
  }, []);

  return data ? (
    data.success ? (
      <>
        <h4>Weather in {country.name}</h4>
        <p>Temp: {data.current.temperature}</p>
      </>
    ) : (
      <>
        <p>Error!</p>
        <p style={{ fontWeight: "bold" }}>Info: {data.error.info}</p>
      </>
    )
  ) : (
    <>
      <h4>Loading weather data...</h4>
    </>
  );
};
export default Weather;
