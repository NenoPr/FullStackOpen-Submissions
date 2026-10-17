import { useState, useEffect } from "react";
import axios from "axios";
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState("");

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
  const selectedCountry =
    filteredCountries.length === 1 ? filteredCountries[0] : null;

  const latitude = selectedCountry?.capitalInfo?.latlng?.[0];
  const longitude = selectedCountry?.capitalInfo?.latlng?.[1];

  useEffect(() => {
    if (latitude === undefined || longitude === undefined) {
      setWeather(null);
      return;
    }

    setWeather(null);

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`,
      )
      .then((response) => {
        console.log(response.data);
        setWeather(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch weather:", error);
      });
  }, [latitude, longitude]);

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
          <h2>Weather in {filteredCountries[0].capital?.[0]}</h2>
          {weather ? (
            <>
              <div>Temperature {weather.main.temp} Celsius</div>

              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />

              <div>Wind: {weather.wind.speed} m/s</div>
            </>
          ) : (
            "Loading weather..."
          )}
        </div>
      ) : filteredCountries.length === 0 ? (
        <p>No matches found</p>
      ) : (
        filteredCountries.map((country) => (
          <div key={country.cca3}>
            {country.name.common}{" "}
            <button
              onClick={() => {
                setSearch(country.name.common);
              }}
            >
              Show
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
