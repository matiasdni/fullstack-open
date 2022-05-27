import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import { Countries } from "./components/Countries";
import axios from "axios";

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

  const NoMatches = () => {
    if (countries.length !== 0 && visibleCountries.length === 0) {
      return <div>no matches</div>;
    } else if (countries.length === 0) {
      return <div>Loading Countries...</div>;
    }
    return null;
  };

  const showDetails = (country) => {
    setShowAll(false);
    setShowCountryDetails(country);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
    setShowAll(true);
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
