import { useEffect, useState } from "@types/react";
import axios from "axios";
import { Weather } from "./Weather";

export const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState({});
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    console.log("effect details");
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}`
      )
      .then((response) => {
        console.log(response.data);
        setWeather(response.data);
      });
  }, []);

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
      <img src={country.flags["png"]} />
      <h2> Weather in {country.capital}</h2>
      <Weather weather={weather} />
    </div>
  );
};
