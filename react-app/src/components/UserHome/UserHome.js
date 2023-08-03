import React from "react";
import classes from "./UserHome.module.css";
import { useEffect, useState } from "react";
import { loadUserServersThunk } from "../../store/servers";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import ServerFormModal from '../ServerFormModal'

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserServersThunk());
  }, [dispatch]);

  const servers = useSelector((state) =>
    Object.values(state.servers.allServers)
  );
  const [activeServer, setActiveServer] = useState(servers[0]);

  return (
    <body>
      <nav className={classes.sidenav}>
        <div className={classes.wrapper}>
          <button>Sonic</button>
          {servers.map((server) => (
            <Link key={server.id} to={`/servers/${server.id}`}>
              <button>{server.name}</button>
            </Link>
          ))}
          <OpenModalButton modalComponent={<ServerFormModal title='Create Server' />} buttonText='+'/>
        </div>
      </nav>
      <nav className={classes.friends}>
        <section className={classes.wrapper}>

        </section>
      </nav>
      <nav className={classes.main}>
        <section className={classes.wrapper}>
          <h2>Add Friend</h2>
          <div>You can add friends with their Discord username.</div>
          <form>
            <input placeholder="You can add friends with their Discord username" />
            <button>Submit</button>
          </form>
        </section>
      </nav>
      <nav className={classes.status}>
        <section className={classes.wrapper}>
          <h2>Active Now</h2>
          <h3>It's quiet for now...</h3>
          <div>When a friend starts an activity-like playing a game or hanging out on voice we'll show it here!</div>
        </section>
      </nav>
    </body>
  );
};

export default Home;
