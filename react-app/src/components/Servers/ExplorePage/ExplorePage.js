import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './ExplorePage.css'
import { loadAllServersThunk } from '../../../store/servers';

const ExplorePage = () => {
    const dispatch = useDispatch();
    const servers = useSelector((state) => Object.values(state.servers.allServers));

    useEffect(() => {
      dispatch(loadAllServersThunk());
    }, [dispatch]);

    return (
      <div>
        <h1>Explore Servers</h1>
        {servers.map((server) => (
          <div key={server.id} className="server">
            <Link to={`/servers/${server.id}`}>
              <h2>{server.name}</h2>
              <img src={server.bannerImage} alt="Server Banner" />
              <p>{server.description}</p>
              <img src={server.serverImage} alt="Server Image" />
            </Link>
          </div>
        ))}
      </div>
    );
  };

  export default ExplorePage;
