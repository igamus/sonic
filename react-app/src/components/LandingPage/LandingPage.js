import React from "react";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import classes from "./LandingPage.module.css";
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import Chat from '../ChannelMessages/Messages/Message';


const LandingPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    console.log('clicked');
    dispatch(sessionActions.logout());
    history.push('/me');
  };

  return (
    <>
      <div className={classes.blue}>
        <h1>IMAGINE A PLACE... </h1>

        <div className={classes.headtext}>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</div>
      </div>
      <NavLink exact to="/login">
        Login
      </NavLink>
      <p></p>
      <div>
        <NavLink exact to="/signup">
          Sign up
        </NavLink>
      </div>
      <button onClick={logout}>Log Out</button>
    </>
  );
};
export default LandingPage;
