import { useState } from "react";
import closeicon from "../../assets/close-icon.svg";
import avatar from "../../assets/avatarface.png";
import"./HeaderMobileModal.css";

function HeaderMobileModal({handleAddClick}) {
  const [isMobileHeaderOpen, setIsMobileHeaderOpen] = useState(false);

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
          >
            
          </button>

          <div className="header__username-container">
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>
            <div className="header__username-inner-container">
              <p className="header__username">Terrence Tegegne</p>
              <img src={avatar} alt="username" className="header__avatar" />
            </div>
          </div>
        </div>
      </>
    );
}
export default HeaderMobileModal