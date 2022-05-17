import { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ handleFilter, filter }) => (
  <div>
    find countries
    <input value={filter} onChange={handleFilter} />
  </div>
);

const Countries = ({ countries, showAll, showDetails, showCountryDetails }) => {
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

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [showCountryDetails, setShowCountryDetails] = useState([]);

  const showDetails = (country) => {
    console.log(country);
    setShowAll(false);
    setShowCountryDetails(country);
  };

  console.log(countries.length);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilter = (event) => {
    setFilter(event.target.value);
    setShowAll(true);
  };

  const NoMatches = () => {
    if (countries.length !== 0 && visibleCountries.length === 0) {
      return <div>no matches</div>;
    } else if (countries.length === 0) {
      return <div>loading countries...</div>;
    }
    return null;
  };

  const visibleCountries = countries.filter((country) =>
    country.name.common.toString().toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Filter handleFilter={handleFilter} filter={filter} />
      <Countries
        countries={visibleCountries}
        filter={filter}
        showAll={showAll}
        showDetails={showDetails}
        showCountryDetails={showCountryDetails}
      />
      <NoMatches />
    </div>
  );
}

export default App;
