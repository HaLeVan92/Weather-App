import React, {useState, useEffect} from 'react';
const api = {
  key: "cf97fae8e2051a9cdf105e1e2f8e4377",
  base : "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      // Process weather
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setWeatherInfo(
            `${data.name}, ${data.sys.country} ${data.weather[0].description}, ${data.main.temp}`);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }

      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  const hanglerSubmit = (e) => {<div>{weatherInfo}</div>
    e.preventDefault();
   setSearchCity(searchInput);
  }
  return (
  <>
    <form onSubmit={hanglerSubmit}>
      <input type="text" placeholder="City" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
      <button type="submit">Get Weather</button>
    </form>
    {loading ? (<div>Loanding...</div>) : (
      <>
        {errorMessage ? (<div style={{color :"red"}}>{errorMessage}</div>) : (<div>{weatherInfo}</div>)}      
      </>
    )}
  </>

  );
}

export default App;
