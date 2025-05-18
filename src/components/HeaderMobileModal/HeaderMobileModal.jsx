import { useState, useContext } from "react";
import closeicon from "../../assets/close-icon.svg";
import avatar from "../../assets/avatarface.png";
import "./HeaderMobileModal.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../utils/CurrentUserContext";

// use the context here to user isloggedin and current user to make logical ops to show the buttons or not depending on the states
function HeaderMobileModal({
  handleAddClick,
  handleLoginClick,
  handleRegisterClick,
}) {
  const [isMobileHeaderOpen, setIsMobileHeaderOpen] = useState(false);

  const { currentUser = {}, isLoggedIn } = useContext(CurrentUserContext);

  const handleToggleMobileMenu = () => {
    setIsMobileHeaderOpen(!isMobileHeaderOpen);
    //use state is used as booleand to manipulate classes and handle the phone size modal
  };
  return (
    <>
      <button
        onClick={handleToggleMobileMenu}
        className={`header__mobile-btn ${
          isMobileHeaderOpen ? "header__mobile-btn_hidden" : ""
        }`}
      >
        <span className="header__btn-hr"></span>
        <span className="header__btn-hr"></span>
      </button>

      <div
        className={`header__user-container ${
          !isMobileHeaderOpen ? "header__user-container_hidden" : ""
        }`}
      >
        <button
          onClick={handleToggleMobileMenu}
          className="header__popup-close"
          type="button"
        ></button>

        {/* is logged in show avatar/username else login buttons */}
        {isLoggedIn ? (
          <div className="header__username-container">
            <ToggleSwitch />
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__link">
              <div className="header__username-inner-container">
                <p className="header__username">{currentUser.name}</p>
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name + " user-image"}
                  className="header__avatar"
                />
              </div>
            </Link>
          </div>
        ) : (
          <div className="header__username-container">
            <div className="header__username-inner-container">
              <ToggleSwitch />
              <button
                onClick={handleLoginClick}
                className=" header__register-btn header__login-btn"
              >
                Login
              </button>
              <button
                onClick={handleRegisterClick}
                className="header__register-btn"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default HeaderMobileModal;
