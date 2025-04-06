import React, { useContext , useState} from "react";
import "./SideBar.css";
import avatarface from "../../assets/avatarface.png";
import CurrentUserContext from "../../utils/CurrentUserContext";
import AvatarComponent from "../AvatarComponent/AvatarComponent"


function SideBar({handleLogout, handleEditBtnClick}) {
  
const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

console.log({ currentUser, isLoggedIn });

  return (
    <div className="sidebar">
      <div className="sidebar__top_section">
        <AvatarComponent />

        <p className="sidebar__username">{currentUser.name}</p>
      </div>

      <button onClick={handleEditBtnClick} className="sidebar__btns">
        {" "}
        Change profile data
      </button>
      <button onClick={handleLogout} className="sidebar__btns">
        Log out
      </button>
      
    </div>
  );
}

export default SideBar;
