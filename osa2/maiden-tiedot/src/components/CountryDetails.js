import { useEffect, useState } from "react";
import { Weather } from "./Weather";
import axios from "axios";

export const CountryDetails = ({ country, lat, long }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`
      )
      .then((response) => setWeather(response.data));
  }, [lat, long]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      capital {country.capital} <br />
      area {country.area}
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags["png"]} alt="Country flag" />
      <h2> Weather in {country.capital}</h2>
      <Weather weather={weather} />
    </div>
  );
};
