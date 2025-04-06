import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
import { getItems, postItem, deleteItem, getUserInfo, patchItem ,removeCardLike,addCardLike  } from "../../utils/api";
import OnDeleteModal from "../OnDeleteModal/OnDeleteModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";
import { getToken, removeToken, storeToken } from "../../utils/token";
import CurrentUserContext from "../../utils/CurrentUserContext";
import ProfileEditModal from "../ProfileEditModal/ProfileEditModal";

function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("C");
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 /*, C:999*/ },
    city: "",
  });

  const [activeModal, setActiveModal] = useState(""); // you can manually set which modal you want to see here
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ username: "", email: "" });

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

  const handleLoginClick = () => {
    setActiveModal("LoginModal");
  };

  const handleRegisterClick = () => {
    setActiveModal("RegisterModal");
  };

  const onAddItem = (/*e ,*/ newItem) => {
    /*e.preventDefault()  console.log(e);*/
    // pull token from local storage and pass to postItem
    postItem(newItem, getToken())
      .then((addedItem) => {
        // clothingItems contains updated data
        console.log(addedItem);
        setClothingItems([
          addedItem.data, // addedItem.data is a response given back from the server
          ...clothingItems /*newItem*/ /*addeItem*/,
        ]); //addedItem is the api data with the newly included item
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
    deleteItem(id, getToken())
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

  const handleEditProfileModal = () => {
    setActiveModal("ProfileEditModal");
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const navigate = useNavigate();
  const handleRegistration = ({
    password,
    //  confirmPassword,
    email,
    name,
    avatar, // these are being destructured from the data obj in register modal and keys should be name the same
  }) => {
    //if (password /*=== confirmPassword*/) {
    auth
      .signup(name, password, email, avatar)
      .then(() => {
        // TODO: handle succesful registration
        // navigate user to login page.
        handleLoginClick();
      })
      .catch(console.error);
    //}
  };

  const handleLogin = ({ email, password }) => {
    // If username or password empty, return without sending a request.
    if (!email || !password) {
      return;
    } // this is not needed

    // We pass the username and password as positional arguments. The
    // authorize function is set up to rename `username` to `identifier`
    // before sending a request to the server, because that is what the
    // API is expecting.
    auth
      .signin(email, password)
      .then((data) => {
        console.log(data);
        // {token: sldfkj28f8j283fj298f32f3, user: {name: ssdkjf, email: sldkfj, password: 123454}}
        // For now we just log the response data to the console.
        // We'll update this soon.

        // Verify that a jwt is included before logging the user in.
        if (data.token) {
          storeToken(data.token);
          setUserData(data.user); // save user's data to state
          setIsLoggedIn(true); // log the user in
          navigate("/profile"); // send them to where they need to be?
          //
          // console.log(data);
          setActiveModal("");
        }
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    console.log("testifitworkds");
  };

  const handleEdit = (data) => {
    // setUserData(data.user);
    patchItem(data, getToken())
      .then((res) => {
        setUserData(res);
        console.log(res);
        console.log("item patched");
      })
      .catch((error) => console.error(error));
    setActiveModal("");
    //closemodal once it is done
  };
 console.log(clothingItems)
  const handleHeartClick = ({id,isLiked}) => {
    //we need
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        
          // the first argument is the card's id
          addCardLike(id, token) // fetch
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.updatedItem : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
       // api.
          // the first argument is the card's id
          removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.updatedItem : item))
            );
          })
          .catch((err) => console.log(err));
    
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
        // console.log(data);
        //setClothingItems
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const jwt = getToken();
    console.log(jwt);
    if (!jwt) {
      return;
    }

    // Call the function, passing it the JWT.
    getUserInfo(jwt)
      .then((data) => {
        //console.log(data);
        // If the response is successful, log the user in, save their
        // data to state, and navigate them to /ducks.
        setIsLoggedIn(true);
        setUserData(data);
        // navigate("/ducks");
      })
      .catch(console.error);

    // TODO - handle JWT
  }, []);

  //console.log(currentTemperatureUnit) // app value to match with toggle switch
  return (
    <div className="page">
      {" "}
      {/*look for best practices for this object */}
      <CurrentUserContext.Provider
        value={{ currentUser: userData, isLoggedIn }}
      >
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    //pass clothingItems as a prop
                    clothingItems={clothingItems}
                    propWeatherData={weatherData}
                    handleCardClick={handleCardClick}
                    handleHeartClick = {handleHeartClick}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      userData={userData}
                      onLogout={handleLogout}
                      handleEditBtnClick={handleEditProfileModal}
                      handleHeartClick= {handleHeartClick}
                    />
                  </ProtectedRoute>
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

          {activeModal === "LoginModal" && (
            <LoginModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "LoginModal"}
              handleLogin={handleLogin}
            />
          )}

          {activeModal === "RegisterModal" && (
            <RegisterModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "RegisterModal"}
              onRegister={handleRegistration}
            />
          )}

          {activeModal === "ProfileEditModal" && (
            <ProfileEditModal
              handleCloseActiveModal={closeActiveModal}
              isOpen={activeModal === "ProfileEditModal"}
              onEdit={handleEdit}
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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
