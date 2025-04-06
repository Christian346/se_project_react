import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatarface.png";
import { useState } from "react";
import HeaderMobileModal from "../HeaderMobileModal/HeaderMobileModal";
import { Link } from "react-router-dom";

function Header({
  handleAddClick,
  weatherData,
  handleLoginClick,
  handleRegisterClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__mobile-btn-container">
        <Link to="/">
          <img src={logo} alt="image logo" className="header__logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <HeaderMobileModal
        handleAddClick={handleAddClick}
        handleLoginClick={handleLoginClick}
        handleRegisterClick={handleRegisterClick}
      />
    </header>
  );
}
export default Header;
