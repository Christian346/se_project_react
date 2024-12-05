import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";


function Main({ propWeatherData, handleCardClick }) {
const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <main>
      <WeatherCard weatherData={propWeatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {propWeatherData.temp[currentTemperatureUnit] /*temp.F*/}{" "}
          &deg; {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === propWeatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  propItem={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}
export default Main;
