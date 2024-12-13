import "./WeatherCard.css";
//import sunny from "../../assets/sunny.png"
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import "../../utils/CurrentTemperatureUnitContext";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../utils/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  /*
  const weatherOptionUrl = filteredOptions[0]?.url;
  //if that is undefined or null dont try do this
  const weatherOptionCondition = filteredOptions[0]?.condition;
  const weatherOptionDay = filteredOptions[0]?.day;
  */
  //-----------
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
        {currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherOption?.day ? "day" : "night"}time 
        ${weatherOption?.condition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}
export default WeatherCard;
