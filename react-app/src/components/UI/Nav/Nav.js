import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUserServersThunk,
  deleteServerThunk,
} from "../../../store/servers";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../../OpenModalButton";
import ServerFormModal from "../../ServerFormModal";
import { logout } from "../../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./Nav.css";

const Nav = ({isLoaded}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(loadUserServersThunk());
  }, [dispatch]);

  const servers = useSelector((state) =>
    Object.values(state.servers.allServers)
  );
  const logoutHelper = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/me");
  };
  const user = useSelector((state) => state.session.user);

  const handleButtonClick = (event) => {
    event.preventDefault();
    window.alert('Coming Soon');
  };

  return (
    <div className="nav-wrap">
      <nav>
        <ul className="guilds-container">
          <NavLink to="/me" className="squircle purple-boi  purlink">
            <svg aria-hidden="false" width="28" height="20" viewBox="0 0 28 20">
              <path
                fill="currentColor"
                d="M20.6644 20C20.6644 20 19.8014 18.9762 19.0822 18.0714C22.2226 17.1905 23.4212 15.2381 23.4212 15.2381C22.4384 15.881 21.5034 16.3334 20.6644 16.6429C19.4658 17.1429 18.3151 17.4762 17.1884 17.6667C14.887 18.0953 12.7774 17.9762 10.9795 17.6429C9.61301 17.381 8.43836 17 7.45548 16.6191C6.90411 16.4048 6.30479 16.1429 5.70548 15.8096C5.63356 15.7619 5.56164 15.7381 5.48973 15.6905C5.44178 15.6667 5.41781 15.6429 5.39384 15.6191C4.96233 15.381 4.7226 15.2143 4.7226 15.2143C4.7226 15.2143 5.87329 17.1191 8.91781 18.0238C8.19863 18.9286 7.31164 20 7.31164 20C2.0137 19.8333 0 16.381 0 16.381C0 8.7144 3.45205 2.50017 3.45205 2.50017C6.90411 -0.07123 10.1884 0.000197861 10.1884 0.000197861L10.4281 0.285909C6.11301 1.52399 4.12329 3.40493 4.12329 3.40493C4.12329 3.40493 4.65068 3.11921 5.53767 2.71446C8.10274 1.59542 10.1404 1.2859 10.9795 1.21447C11.1233 1.19066 11.2432 1.16685 11.387 1.16685C12.8493 0.976379 14.5034 0.92876 16.2295 1.11923C18.5068 1.38114 20.9521 2.0478 23.4452 3.40493C23.4452 3.40493 21.5514 1.61923 17.476 0.381146L17.8116 0.000197861C17.8116 0.000197861 21.0959 -0.07123 24.5479 2.50017C24.5479 2.50017 28 8.7144 28 16.381C28 16.381 25.9623 19.8333 20.6644 20ZM9.51712 8.88106C8.15068 8.88106 7.07192 10.0715 7.07192 11.5239C7.07192 12.9763 8.17466 14.1667 9.51712 14.1667C10.8836 14.1667 11.9623 12.9763 11.9623 11.5239C11.9863 10.0715 10.8836 8.88106 9.51712 8.88106ZM18.2671 8.88106C16.9007 8.88106 15.8219 10.0715 15.8219 11.5239C15.8219 12.9763 16.9247 14.1667 18.2671 14.1667C19.6336 14.1667 20.7123 12.9763 20.7123 11.5239C20.7123 10.0715 19.6336 8.88106 18.2671 8.88106Z"
              ></path>
            </svg>
            <div className="popper-boi">
              <h4 className="popper-text">Home</h4>
            </div>
          </NavLink>

    <hr></hr>

          {servers.map((server) => (
            <li className="squircle purple-boi">
              <Link to={`/servers/${server.id}`}>
                <img
                  src={server.serverImage}
                  alt="Server"
                  className="server-icon"
                />
              </Link>
              <div className="popper-boi">
                <h4 className="popper-text">{server.name}</h4>
              </div>
              {/* <button onClick={() => handleDeleteServer(server.id)}>Delete</button> */}
            </li>
          ))}

          <li className="squircle green-boi">
            {/* <svg
              className="circleIcon-LvPL6c"
              aria-hidden="false"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z"
              ></path>
            </svg> */}
            <OpenModalButton
              modalComponent={<ServerFormModal title="Create Server" />}
              buttonText="&#43;"
              className="open-create-server"
            />
            <div className="popper-boi">
              <h4 className="popper-text">Add Server</h4>
            </div>
          </li>
          <NavLink to="/servers/explore">
            <li className="squircle green-boi">
              <svg
                aria-hidden="false"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 10.9C11.39 10.9 10.9 11.39 10.9 12C10.9 12.61 11.39 13.1 12 13.1C12.61 13.1 13.1 12.61 13.1 12C13.1 11.39 12.61 10.9 12 10.9ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.19 14.19L6 18L9.81 9.81L18 6L14.19 14.19Z"
                ></path>
              </svg>
              <div className="popper-boi">
                <h4 className="popper-text">Explore Public Servers</h4>
              </div>
            </li>
          </NavLink>
        </ul>
        <section className="panel">
          <div className="user-info">
            <div className="avatar-wrapper">
              <img className="avatar" src={user.profilePic} alt="" />
              <div className="status-holder">
                <div className="user-status-icon"></div>
              </div>
            </div>
            <div className="name-tag-container">
              <h1
                className="username tipper-boi"
                data-tip="You're in"
              >
                {user.username}
              </h1>
            </div>
          </div>
          <div className="button-container">
            {/* <button className="switcher tipper-boi hideng" data-tip="Unmute">
              <svg
                aria-hidden="false"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6.7 11H5C5 12.19 5.34 13.3 5.9 14.28L7.13 13.05C6.86 12.43 6.7 11.74 6.7 11Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M9.01 11.085C9.015 11.1125 9.02 11.14 9.02 11.17L15 5.18V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 11.03 9.005 11.0575 9.01 11.085Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M11.7237 16.0927L10.9632 16.8531L10.2533 17.5688C10.4978 17.633 10.747 17.6839 11 17.72V22H13V17.72C16.28 17.23 19 14.41 19 11H17.3C17.3 14 14.76 16.1 12 16.1C11.9076 16.1 11.8155 16.0975 11.7237 16.0927Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M21 4.27L19.73 3L3 19.73L4.27 21L8.46 16.82L9.69 15.58L11.35 13.92L14.99 10.28L21 4.27Z"
                  class="strikethrough-1n4ekb"
                  fill="red"
                ></path>
              </svg>
            </button>
            <button className="switcher tipper-boi  hideng" data-tip="Deafen">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  d="M12 2.00305C6.486 2.00305 2 6.48805 2 12.0031V20.0031C2 21.1071 2.895 22.0031 4 22.0031H6C7.104 22.0031 8 21.1071 8 20.0031V17.0031C8 15.8991 7.104 15.0031 6 15.0031H4V12.0031C4 7.59105 7.589 4.00305 12 4.00305C16.411 4.00305 20 7.59105 20 12.0031V15.0031H18C16.896 15.0031 16 15.8991 16 17.0031V20.0031C16 21.1071 16.896 22.0031 18 22.0031H20C21.104 22.0031 22 21.1071 22 20.0031V12.0031C22 6.48805 17.514 2.00305 12 2.00305Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button> */}
            <button className="switcher tipper-boi" data-tip="Logout" onClick={logoutHelper}>
              <svg
                aria-hidden="false"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                ></path>
              </svg>
            </button>
          </div>
        </section>
      </nav>
      <nav className="main">
        <section className="wraps">
          <h2>Add Friend</h2>
          <div>Enter a Username#000 </div>
          <form>
      <div className="input-group">
        <input type="text" placeholder="You can add friends with their Discord username" />
        <button type="submit" className="login-bttns" onClick={handleButtonClick}>
          Send a Friend Request
        </button>
      </div>
    </form>
        </section>
      </nav>

    </div>

  );
};
export default Nav;
