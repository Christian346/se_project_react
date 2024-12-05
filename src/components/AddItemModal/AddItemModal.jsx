import React from "react";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ closeActiveModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  
  const [link, setUrl] = useState("")

  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };

  const handleSubmit = (e) =>{
 e.preventDefault();
 onAddItem({name,link})
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
          className="modal__input"
          id="imageUrl"
          placeholder="Image Url"
          value={link}
          onChange={handleUrlChange}
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

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="warm"
            className="modal__input modal__radio-input"
            name="radio-choice"
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
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
  );
};
export default AddItemModal;
