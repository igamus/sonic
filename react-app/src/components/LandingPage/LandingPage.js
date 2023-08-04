import React from "react";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import classes from "./LandingPage.module.css";
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';

const LandingPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/me');
  };

  return (
    <>
      <div className={classes.blue}>
        <h1 className={classes.big}>IMAGINE A PLACE... </h1>

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
      {user ? <button onClick={(e) => {
        e.preventDefault();
        history.push('/me');
      }}>Go to your servers!</button> : null}
    </>
  );
};
export default LandingPage;
