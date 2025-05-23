import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
//import { defaultClothingItems } from "../../utils/constants";//has to be taken out
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../utils/CurrentTemperatureUnitContext";

function Main({
  propWeatherData,
  handleCardClick,
  clothingItems,
  handleHeartClick,
}) {
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
          {
            //defaultClothingItems
            clothingItems // this is what needs to be used
              .filter((item) => {
                return item.weather === propWeatherData.type;
              })
              .map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    singleCard={item}
                    onCardClick={handleCardClick}
                    handleHeartClick={handleHeartClick}
                  />
                );
              })
          }
        </ul>
      </section>
    </main>
  );
}
export default Main;
