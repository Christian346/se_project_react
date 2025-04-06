import React, { useState, useContext } from "react";
import CurrentUserContext from "../../utils/CurrentUserContext";
import "../SideBar/SideBar.css";

const AvatarComponent = () => {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const [avatarError, setAvatarError] = useState(false);

  function avatarErrorHandler() {
    setAvatarError(true);
  }

  return (
    <>
      {avatarError ? (
        <div className="sidebar__first_letter_circle">
          <p>{currentUser.name[0]}</p>
        </div>
      ) : (
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          onError={avatarErrorHandler}
          className="sidebar__avatar"
        />
      )}
    </>
  );
};

export default AvatarComponent;
