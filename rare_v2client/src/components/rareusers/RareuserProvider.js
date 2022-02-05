import React, {useState, useEffect} from "react";

export const RareUserContext = React.createContext();
export const RareUserProvider = (props) =>{
  const [currentUser, setCurrentUser] = useState({});

  const getCurrentUser = () => {
    return fetch("http://localhost:8000/profile", {
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
      },
    })
      .then((response) => response.json())
      .then(setCurrentUser);
  };
  return (
    <RareUserContext.Provider value={{getCurrentUser,currentUser}}>
      {props.children}
    </RareUserContext.Provider>
  )
}