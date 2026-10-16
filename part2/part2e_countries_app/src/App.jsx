import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div>
        find countries{" "}
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {search.trim() === "" ? null : filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <div>
          <h1>{filteredCountries[0].name.common}</h1>
          <div>Capital: {filteredCountries[0].capital?.[0]}</div>
          <div>Area: {filteredCountries[0].area}</div>

          <h2>Languages</h2>
          <ul>
            {Object.values(filteredCountries[0].languages || {}).map(
              (language) => (
                <li key={language}>{language}</li>
              ),
            )}
          </ul>

          <img
            src={filteredCountries[0].flags.png}
            alt={`Flag of ${filteredCountries[0].name.common}`}
            width="150"
          />
        </div>
      ) : filteredCountries.length === 0 ? (
        <p>No matches found</p>
      ) : (
        filteredCountries.map((country) => (
          <div key={country.cca3}>{country.name.common}</div>
        ))
      )}
    </div>
  );
}

export default App;
