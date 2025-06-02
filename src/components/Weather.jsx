import "../App.css";
import clear from "../assets/clear.png";
import humidity from "../assets/humidity.png";
import windImage from "../assets/wind.png";
import cloud from "../assets/cloud.png";
import snow from "../assets/snow.png";
import rain from "../assets/rain.png";
const Weather = ({ data, searchTerm }) => {
  const hasWeather =
    data &&
    data.main &&
    data.weather &&
    Array.isArray(data.weather) &&
    data.weather.length > 0 &&
    data.wind;

  let weatherImage = clear;

  if (hasWeather) {
    if (data.weather[0].main === "Clouds") weatherImage = cloud;
    else if (data.weather[0].main === "Rain") weatherImage = rain;
    else if (data.weather[0].main === "Snow") weatherImage = snow;
    else weatherImage = clear;
  }
  return (
    <>
      <div className="content">
        {searchTerm && hasWeather ? (
          <>
            <img src={weatherImage} alt="" className="weather-img" />
            <h1 className="weather-head">
              {(data.main.temp - 273).toFixed(2)}°C
            </h1>
            <h2 className="weather-city">{data.weather[0].main}</h2>
          </>
        ) : (
          <>
            <h1 className="weather-head">-</h1>
            <h2 className="weather-city">-</h2>
          </>
        )}
      </div>
      <div className="footer">
        <div className="humidity">
          <img src={humidity} alt="" />
          <div className="humidity-info">
            {searchTerm && hasWeather ? (
              <>
                <h3>{data.main.humidity} %</h3>
                <p>Humidity</p>
              </>
            ) : (
              <>
                <h3>N/A</h3>
                <p>Humidity</p>
              </>
            )}
          </div>
        </div>
        <div className="wind">
          <img src={windImage} alt="" />
          <div className="wind-info">
            {searchTerm && hasWeather ? (
              <>
                <h3>{data.wind.speed} km/h</h3>
                <p>Wind Speed</p>
              </>
            ) : (
              <>
                <h3>N/A</h3>
                <p>Wind Speed</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
