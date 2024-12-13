import React from "react";
import "./SideBar.css";
import avatarface from "../../assets/avatarface.png"


function SideBar() {
  return (
    <div className="sidebar">
      <img
        src={avatarface}
        alt="Default avatar face"
        className="sidebar__avatar"
      />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;
