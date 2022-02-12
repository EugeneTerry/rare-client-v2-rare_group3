import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { RareUserContext } from "./RareuserProvider";
import moment from "moment";
import "../styles/rareuser.css";

export const RareUserList = () => {
  const { currentUser, getCurrentUser } = useContext(RareUserContext);
  const history = useHistory();

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <article className="rareuser_wrapper">
      <header>
        <h1>Hello {currentUser.user?.first_name}</h1>
      </header>
      <section>
        <header className="user_info">
          <h3>Here is your profile</h3>
        </header>
      </section>
      <div className="user_header">
        <div>
          <ul>
            <img
              className="profile_image"
              src={currentUser.profile_image_url}
            />
          </ul>
          <ul>
            <b>Full Name:</b> {""} {currentUser.user?.first_name} {""}
            {currentUser.user?.last_name}
          </ul>
          <ul>
            <b>Email:</b> {""} {currentUser.user?.email} {""}
            {currentUser.user?.last_name}
          </ul>
          <ul>
            <b>Joined On:</b> {moment(currentUser.created_on).format("MMMM DD YYYY")}
          </ul>
        </div>
      </div>
    </article>

  );
};
