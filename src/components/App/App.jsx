import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 /*, C:999*/ },
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((bodyofresponse) => {
        const filteredData = filterWeatherData(bodyofresponse);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []); // empty array will make it so it runs only once

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main propWeatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>

      <ModalWithForm
        titleText="New garment "
        buttonText="Add garment"
        activeModal={activeModal}
        isOpen={activeModal === "add-garment"}
        handleCloseActiveModal={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>

        <label htmlFor="imageUrl" className="modal__label">
          Image URL{" "}
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="Image Url"
          />
        </label>

        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              type="radio"
              id="hot"
              className="modal__input modal__radio-input"
              name="radio-choice"
            />
            Hot
          </label>

          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              id="warm"
              className="modal__input modal__radio-input"
              name="radio-choice"
            />
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              id="cold"
              className="modal__input modal__radio-input"
              name="radio-choice"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        handleCloseActiveModal={closeActiveModal}
      />
    </div>
  );
}

export default App;
