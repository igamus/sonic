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

const Nav = ({ isLoaded }) => {
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
            <svg fill="currentColor" width="35" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1333.3 1062.26" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd">
              <g id="Layer_x0020_1">
                <g id="_1473327709744">
                  <path class="fil0" d="M512.04 551.2c-39.86 7.98-39.86 55.8-31.89 119.6 7.98 71.75 31.89 119.6 71.76 111.63 39.87 0 39.87-55.82 31.9-119.6-7.97-63.78-23.93-111.63-71.76-111.63z"/>
                  <path class="fil0" d="M1333.3 630.93s-23.94-111.61-143.53-207.29c-111.63-79.74-231.23-71.77-231.23-71.77s31.9-63.79 119.6-111.63c79.74-39.87 191.35-47.82 191.35-47.82s-71.75-87.72-215.27-143.53C878.8-14.9 735.29-14.9 559.87 40.92 368.5 104.71 232.96 256.2 232.96 256.2S41.6 200.38 9.7 248.21c-39.86 47.86 55.82 231.24 55.82 231.24S41.59 535.26 49.56 638.9c7.98 111.63 71.78 191.38 71.78 191.38-31.9 7.95-63.79 23.9-63.79 47.82 0 23.93 47.84 47.85 103.65 47.85h23.93c55.8 55.8 135.54 127.55 255.14 135.53 151.49 7.97 247.17-47.82 310.96-63.78 71.75-23.93 175.41-23.93 239.19-23.93 191.36 23.93 271.08 71.78 271.08 71.78s7.97-87.73-71.75-207.33c-63.79-87.7-191.37-119.58-191.37-119.58s63.79-55.82 143.53-71.78c103.67-23.89 191.38-15.94 191.38-15.94zM121.36 766.48c-15.95-31.9-23.93-63.78-31.9-159.48 0-47.82 15.95-103.63 39.86-111.61 31.9-7.97 31.9 47.85 47.85 95.69 0 15.92 15.94 39.85 23.91 63.78-7.97-7.98-7.97-7.98-7.97 0-23.91 0-31.89 47.85-15.94 103.65 7.97 31.9 23.91 63.8 39.86 71.78-15.95 0-31.89-7.97-55.81-7.97 0 0-7.97 0-7.97 7.97-7.98-15.98-23.93-39.88-31.89-63.81zm494.33 0c-39.86 79.73-103.65 103.65-175.41 103.65-71.78 0-119.6-39.85-191.37-31.9 15.96-15.93 15.96-55.8 7.97-103.65-7.97-7.97-7.97-15.93-15.95-31.87 23.94 15.95 39.87-7.97 39.87-7.97s7.96-119.6 47.83-199.34c31.89-63.78 79.73-111.63 151.49-119.59 63.79-15.95 111.63 31.89 135.54 103.65 23.93 71.74 31.91 207.3.01 287.02z"/>
                </g>
              </g>
            </svg>
            <div className="popper-boi">
              <h4 className="popper-text">Home</h4>
            </div>
          </NavLink>

          <hr></hr>

          {servers.map((server) => (
            <li className="squircle purple-boi" key={server.id}>
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
              <input type="text" placeholder="You can add friends with their Sonic username" />
              <button type="submit" className="login-bttns" onClick={handleButtonClick}>
                Send a Friend Request
              </button>
            </div>
          </form>
        </section>
        <section className="wraps">
          <h2>Meet our devs!</h2>
          <div className="devs-container">
            <ul className="dev-list">
              <li>
                <h3 className="dev-header">
                  <span className="dev-links">
                    <span>Oscar Alcantar</span>
                    <a href="https://www.linkedin.com/in/oscaralcantar/" target="_blank" rel="noreferrer"><img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/linkedin-round-icon.png" className="ex-link-icon" /></a>
                    <a href="https://github.com/Oscar-999" target="_blank" rel="noreferrer"><img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-icon.png" className="ex-link-icon" /></a>
                  </span>
                </h3>
                  <div className="dev-blurb-container">
                    <img src="https://avatars.githubusercontent.com/u/123038205?v=4" className="dev-icon"/>
                    <p className="dev-blurb">I'm a software developer from the Hispanic Latino community, proud graduate of App Academy. Skilled in JavaScript, HTML5, CSS3, Express.js, Flask, Postgres, and NodeJS, I have experience deploying robust web applications. Passionate about exploring the intricacies of coding, I thrive on embracing challenges and am on the hunt for a role that fuels my unending desire to learn and push boundaries. Ready to bring my dedication and drive to an innovative team.</p>
                  </div>
              </li>
              <li>
                <h3 className="dev-header">
                  <span className="dev-links">
                    <span>Isaac Gamus</span>
                    <a href="https://www.linkedin.com/in/isaac-gamus/" target="_blank" rel="noreferrer"><img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/linkedin-round-icon.png" className="ex-link-icon" /></a>
                    <a href="https://github.com/igamus/" target="_blank" rel="noreferrer"><img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-icon.png" className="ex-link-icon" /></a>
                  </span>
                </h3>
                <div className="dev-blurb-container">
                  <p className="dev-blurb">My name is Isaac Gamus, and I make full stack web applications using JavaScript and Python! I love puzzles. Word puzzles. Sudoku. You name it. I find that asking, “How do these pieces come together?”, thinking through the process, and testing your hypothesis results in new knowledge, self-improvement, and a huge dopamine rush. It drove my creative process in the theatre, brought me to the biochem lab, and fuels my spiritual journey. In theatre, I loved the process of sprinting with my team to bring an idea to life, how that process transformed us, and how what we created transformed our audience. I’m looking forward to bringing that passion into the apps we’ll build together!</p>
                  <img src="https://avatars.githubusercontent.com/u/80405823?v=4" alt="handsome boi" className="dev-icon" />
                </div>
              </li>
              <li>
                <h3 className="dev-header">
                  <span className="dev-links">
                    <span>Brian Freese</span>
                    <a href="https://www.linkedin.com/in/brian-freese-47875b10b/" target="_blank" rel="noreferrer"><img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/linkedin-round-icon.png" className="ex-link-icon" /></a>
                    <a href="https://github.com/IceLordUlmo" target="_blank" rel="noreferrer"><img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-icon.png" className="ex-link-icon" /></a>
                  </span>
                </h3>
                <div className="dev-blurb-container">
                  <img src="https://avatars.githubusercontent.com/u/123122343?v=4" className="dev-icon"/>
                  <p className="dev-blurb">My interest in programming started at a young age, when my family acquired a floppy disk with a few games on it from a garage sale for our 386/25mhz Gateway 2000 computer. It had four megabytes of RAM; who could ever dream of needing more? After poking around on the hard drive for a bit I discovered GORILLAS.BAS, and found out how to take the safeties off the velocity and angle parameters for the exploding bananas. From there I went on to check out every book I could find at the library concerning programming.</p>
                </div>
              </li>
            </ul>

          </div>
        </section>
      </nav>

    </div>

  );
};
export default Nav;
