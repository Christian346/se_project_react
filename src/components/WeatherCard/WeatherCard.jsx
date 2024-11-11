import "./WeatherCard.css";
//import sunny from "../../assets/sunny.png"
import { weatherOptions , defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });


let weatherOption;
 if(filteredOptions.length === 0){
  weatherOption = defaultWeatherOptions[weatherData.isDay ? "day":"night"];
 }else{
     weatherOption = filteredOptions[0]
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
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherOption?.day ? "day":"night"}time 
        ${weatherOption?.condition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}
export default WeatherCard;
