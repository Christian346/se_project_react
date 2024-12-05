import React from "react";

const CurrentTemperatureUnitContext = React.createContext({
  currentTemperateUnit: "",
  handleToggleSwitchChange: () => {},
}); //serves as a placeholder to be used throughout app in App.js it will be replaced to what
//is received from weatherApi which is an obj and used throughout weathercard and main component

export { CurrentTemperatureUnitContext };
