import React from "react";
import classes from "./UserHome.module.css";
import { useEffect, useState } from "react";
import { loadUserServersThunk } from "../../store/servers";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserServersThunk());
  }, [dispatch]);


  const servers = useSelector(state => Object.values(state.servers.allServers))
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
          <button>+</button>
        </div>
      </nav>
      <nav className={classes.friends}>
        <section className={classes.wrapper}></section>
      </nav>
      <nav className={classes.main}>
        <section className={classes.wrapper}></section>
      </nav>
      <nav className={classes.status}>
        <section className={classes.wrapper}></section>
      </nav>
    </body>
  );
};

export default Home;
