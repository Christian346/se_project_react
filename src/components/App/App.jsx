import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../utils/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { getItems, postItem, deleteItem } from "../../utils/api";
import OnDeleteModal from "../OnDeleteModal/OnDeleteModal";

function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("C");

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 /*, C:999*/ },
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const [clothingItems, setClothingItems] = useState([]);

  const handleAddClick = () => {
    setActiveModal(/*"add-garment"*/ "create");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onAddItem = (/*e ,*/ newItem) => {
    /*e.preventDefault()  console.log(e);*/
    postItem(newItem)
      .then(() => {
        // clothingItems contains updated data
        setClothingItems([...clothingItems, newItem]);
        closeActiveModal();
      })
      .catch((error) => {
        console.log(error);
      });
    //console.log(values);
    // console.log(e.target)
  };

  const onDeleteItem = (id) => {
    console.log("test");
    deleteItem(id)
      .then(() => {
        const filteredClothingItems = clothingItems.filter((clothingItem) => {
          return clothingItem._id !== id;
        });
        setClothingItems(filteredClothingItems);
        closeActiveModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickDeleteModal = () => {
    setActiveModal("OnDeleteModal");
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((bodyofresponse) => {
        const filteredData = filterWeatherData(bodyofresponse);
        // console.log(filteredData)
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []); // empty array will make it so it runs only once

  //fetch
  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        //setClothingItems
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  //console.log(currentTemperatureUnit) // app value to match with toggle switch
  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  //pass clothingItems as a prop
                  clothingItems={clothingItems}
                  propWeatherData={weatherData}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>

          {/*<Main
            propWeatherData={weatherData}
            handleCardClick={handleCardClick}
          />*/}

          <Footer />
        </div>
        {activeModal === "create" && (
          <AddItemModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "create"}
            onAddItem={onAddItem}
          />
        )}

        {activeModal === "OnDeleteModal" && (
          <OnDeleteModal
            handleClickDeleteModal={handleClickDeleteModal}
            activeModal={activeModal}
            handleCloseActiveModal={closeActiveModal}
            onDeleteItem={onDeleteItem}
            card={selectedCard}
          />
        )}

        {activeModal === "preview" && (
          <ItemModal
            activeModal={activeModal}
            handleClickDeleteModal={handleClickDeleteModal}
            card={selectedCard}
            handleCloseActiveModal={closeActiveModal}
          />
        )}

        {/*
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
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
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
*/}
        {/*
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          handleCloseActiveModal={closeActiveModal}
        />
       */}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
