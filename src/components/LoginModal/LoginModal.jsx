import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({ closeActiveModal, isOpen, handleLogin }) => {
  //   const [name, setName] = useState("");
  //   const [imageUrl, setImageUrl] = useState("");
  //   const [weather, setWeather] = useState("");

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  //   const handleNameChange = (e) => {
  //     console.log(e.target.value);
  //     setName(e.target.value);
  //   };
  //   //handler for set weather todo

  //   const handleImageUrlChange = (e) => {
  //     console.log(e.target.value);
  //     setImageUrl(e.target.value);
  //   };

  //   const handleTypeOfWeatherChange = (e) => {
  //     setWeather(e.target.value);
  //   };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value, // 'email' : 'sdfjsdkf'
    }));
  };

  //   const [message, setMessage] = useState(false)
  //   const handleButtoClick = ()=>{

  //       setMessage((prev)=>{return !prev});
  //   }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
    //  onAddItem({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      titleText="Log in "
      buttonText="Log in"
      //isOpen={activeModal === "LoginModal"}
      handleCloseActiveModal={closeActiveModal}
      isOpen={isOpen}
      onSubmit={/*(e) => onAddItem(e, { name })*/ handleSubmit} // to populate data on the onAddItem in App.js
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          name="email"
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange} //{handleNameChange}
        />
      </label>

      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          name="password"
          type="password"
          required
          className="modal__input"
          id="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange} //{handleImageUrlChange}
        />
      </label>
      <p> or Sign up</p>
    </ModalWithForm>
  );
};
export default LoginModal;
