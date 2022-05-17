import { CountryDetails } from "./CountryDetails";

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
