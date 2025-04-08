import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

const RegisterModal = ({
  closeActiveModal,
  onRegister,
  isOpen,
  handleLoginClick,
}) => {
  //   const [name, setName] = useState("");
  //   const [imageUrl, setImageUrl] = useState("");
  //   const [email, setEmail] = useState("");

  // The inputs are controlled via a single piece of state: an object
  // object called `data`. This lets us avoid writing separate change
  // handlers for each input.

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    // confirmPassword: "",
    avatar: "", //match the schema
  });

  // This function fires whenever an input is changed, and it updates
  // the value of the changed input. Note that the keys of this
  // object match the name attributes of the corresponding inputs.

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //   const handleNameChange = (e) => {
  //     console.log(e.target.value);
  //     setName(e.target.value);
  //   };
  //   //handler for set weather todo

  //   const handleImageUrlChange = (e) => {
  //     console.log(e.target.value);
  //     setImageUrl(e.target.value);
  //   };
  //   const handleEmailInput = (e) => {
  //     setEmail(e.target.value);
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(data /*{ name, password, email, avatarUrl }*/);
  };

  return (
    <ModalWithForm
      titleText="Sign up"
      buttonText="Sign up"
      // activeModal={activeModal}
      // isOpen={activeModal === "add-garment"}
      handleCloseActiveModal={closeActiveModal}
      isOpen={isOpen}
      onSubmit={/*(e) => onAddItem(e, { name })*/ handleSubmit} // to populate data on the onAddItem in App.js
    >
      <label htmlFor="email" className="modal__label">
        Email*{" "}
        <input
          name="email"
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          value={data.email} // {email} //
          onChange={handleChange} //{handleEmailInput}
        />
      </label>

      <label htmlFor="password" className="modal__label">
        Password*{" "}
        <input
          name="password"
          type="password"
          required
          className="modal__input"
          id="password"
          placeholder="Password"
          value={data.password} //{password} //
          onChange={handleChange} //{handlePassword}
        />
      </label>

      <label htmlFor="name" className="modal__label">
        Name *{" "}
        <input
          name="name"
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={data.name} // {name}
          onChange={handleChange} //{handleNameChange}
        />
      </label>

      <label htmlFor="avatar" className="modal__label">
        Avatar URL *{" "}
        <input
          name="avatar"
          type="url"
          required
          className="modal__input"
          id="avatar"
          placeholder="Avatar Url"
          value={data.avatar} //{avatarUrl}
          onChange={handleChange} //{handleImageUrlChange}
        />
      </label>
      <p className="modal__log_in-btn" onClick={handleLoginClick}>
        or Log in
      </p>
    </ModalWithForm>
  );
};
export default RegisterModal;
