import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './ExplorePage.css'
import { loadAllServersThunk, joinServerThunk } from '../../../store/servers';
import ExploreServer from './ExploreServer'
import { useHistory } from 'react-router-dom';
const ExplorePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const servers = useSelector((state) => Object.values(state.servers.allServers));
  useEffect(() => {
    dispatch(loadAllServersThunk());
  }, [dispatch]);

  const back = () => {
    history.push('/me')
  }
  return (
    <div className='greyyy'>
      <button onClick={back} className='back  f23'>&#11013; Back</button>
      <h1 className='main-explore'>Explore Servers</h1>
      <div id='explore-servers-container'>
        {servers.map((server) => (
          <ExploreServer key={server.id} server={server} />
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
