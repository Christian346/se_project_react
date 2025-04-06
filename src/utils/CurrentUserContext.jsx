// import React, {createContext, useState ,useContext} from 'react';

// const CurrentUserContext = createContext();

// // Custom hook to use the current user context
// export const useCurrentUser = () => {
//   return useContext(CurrentUserContext);
// };
// // this is the provider or wrapper that will allow to use the variable set in the context and all within children have access to it.
// export const CurrentUserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   // Function to set the user (you can call this when user logs in or out)
//   const setUser = (user) => {
//     setCurrentUser(user);
//   };

//   // You can add more logic here to manage user state

//   return (
//     <CurrentUserContext.Provider value={{ currentUser, setUser }}>
//       {children}
//     </CurrentUserContext.Provider>
//   )
// };

import React, { createContext } from "react";

const CurrentUserContext = React.createContext({
  currentUser: {},
  isLoggedIn: false,
});

export default CurrentUserContext;
