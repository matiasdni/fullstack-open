import {useEffect, useState} from "react";
import axios from "axios";
import {Countries} from "./components/Countries";
import {Filter} from "./components/Filter";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [showCountryDetails, setShowCountryDetails] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const showDetails = (country) => {
    console.log(country);
    setShowAll(false);
    setShowCountryDetails(country);
  };

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
        <Filter handleFilter={handleFilter} filter={filter}/>
        <Countries
            countries={visibleCountries}
            filter={filter}
            showAll={showAll}
            showDetails={showDetails}
            showCountryDetails={showCountryDetails}
        />
        <NoMatches/>
      </div>
  );
}

export default App;
