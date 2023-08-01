import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import classes from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <>
    <div className={classes.blue}>
      <h1>IMAGINE A PLACE... </h1>

      <div className={classes.headtext}>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</div>
      </div>
      <NavLink exact to="/login">
        Loginpage temporary
      </NavLink>
      <div>
        <NavLink exact to="/me">
          Servers emporaryp
        </NavLink>
      </div>
    </>
  );
};
export default LandingPage;
