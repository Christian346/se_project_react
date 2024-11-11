import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatarface.png";

import { useState } from "react";
import HeaderMobileModal from "../HeaderMobileModal/HeaderMobileModal";

function Header({ handleAddClick, weatherData }) {

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});



  return (
    <header className="header">
      <div className="header__mobile-btn-container">
        <img src={logo} alt="image logo" className="header__logo" />
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <HeaderMobileModal handleAddClick={handleAddClick} />
    </header>
  );
}
export default Header;
