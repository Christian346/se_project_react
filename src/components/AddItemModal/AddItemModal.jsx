import React from "react";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ closeActiveModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const[weather, setWeather]= useState("");

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  //handler for set weather todo


  const handleImageUrlChange = (e) => {
    console.log(e.target.value);
    setImageUrl(e.target.value);
  };

  const handleTypeOfWeatherChange = (e) =>{
    setWeather(e.target.value)
  }

  const handleSubmit = (e) =>{
 e.preventDefault();
 onAddItem({name,imageUrl,weather})
  };

  return (
    <ModalWithForm
      titleText="New garment "
      buttonText="Add garment"
      // activeModal={activeModal}
      // isOpen={activeModal === "add-garment"}
      handleCloseActiveModal={closeActiveModal}
      isOpen={isOpen}
      onSubmit={/*(e) => onAddItem(e, { name })*/ handleSubmit} // to populate data on the onAddItem in App.js
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        Image URL{" "}
        <input
          type="url"
          required
          className="modal__input"
          id="imageUrl"
          placeholder="Image Url"
          value={imageUrl}
          onChange={handleImageUrlChange}
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
            value="hot"
            onChange={handleTypeOfWeatherChange}
          />
          Hot
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="warm"
            className="modal__input modal__radio-input"
            name="radio-choice"
            value="warm"
            onChange={handleTypeOfWeatherChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="cold"
            className="modal__input modal__radio-input"
            name="radio-choice"
            value="cold"
            onChange={handleTypeOfWeatherChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};
export default AddItemModal;
