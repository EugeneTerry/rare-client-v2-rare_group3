import React, {useEffect, useContext} from "react";
import { useHistory } from "react-router-dom";
import { RareUserContext } from "./RareuserProvider";
import moment from "moment";

export const RareUserList = () => {
  const {currentUser, getCurrentUser} = useContext(RareUserContext);
  const history = useHistory();

  useEffect(() => {
    getCurrentUser()

  }, []);

  return (
    <article className="rareuser_wrapper"> 
      <header>
        <h1>Your Profile</h1>
      </header>
      <section>
        <header className="user_info"><h3>Info</h3></header>
      </section>
        <div className="user_header">
          <ul>
            <li>Name: {currentUser.user?.user.first_name} </li>
          </ul>
        </div>
    </article>
  )
}