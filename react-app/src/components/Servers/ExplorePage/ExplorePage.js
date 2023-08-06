import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './ExplorePage.css'
import { loadAllServersThunk, joinServerThunk } from '../../../store/servers';
import ExploreServer from './ExploreServer'
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
        <ExploreServer server={server} />
      ))}
    </div>
  );
};

export default ExplorePage;
