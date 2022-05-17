import { useEffect, useState } from "@types/react";
import axios from "axios";

export const Countries = ({
  countries,
  showAll,
  showDetails,
  showCountryDetails,
}) => {
  console.log(showAll);
  console.log("countries update", countries.length);
  if (countries.length !== 0) {
    if (countries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (showAll) {
      return (
        <div>
          {countries.map((country) => {
            return (
              <div key={country.name.official}>
                {country.name.common}
                <button onClick={() => showDetails(country)}>show</button>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <CountryDetails country={showCountryDetails} />;
    }
  }
};
const Weather = ({ weather }) => {
  if (weather.hasOwnProperty("name")) {
    return (
      <div>
        temperature {(weather.main.temp - 273.15).toPrecision(3)} Celsius <br />
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        />
        <br />
        wind {weather.wind.speed} m/s
      </div>
    );
  }
};
const CountryDetails = ({ country }) => {
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
