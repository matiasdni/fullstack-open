export const Weather = ({ weather }) => {
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
