import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadSingleServerThunk } from '../../../store/servers';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { loadServerChannelsThunk } from '../../../store/channels';

const SingleSpot = () => {
  const { serverId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSingleServerThunk(serverId));
    dispatch(loadServerChannelsThunk(serverId));
  }, [dispatch, serverId]);

  const server = useSelector((state) => state.servers.singleServer);
  const channels = useSelector((state) => Object.values(state.channels.serverChannels));

  return (
    <div>
      {server ? (
        <div>
          <h1>Single Server Info</h1>
          <p>Name: {server.name}</p>
          <p>Description: {server.description}</p>
          <img src={server.serverImage} alt="Server Image" />
          {/* Display channels */}
          <h2>Channels:</h2>
          {channels.map((channel) => (
            <Link key={channel.id} to={`/servers/${serverId}/${channel.id}`}>
              <p>{channel.name}</p>
            </Link>
          ))}
          {channels.length === 0 && <p>No channels available for this server.</p>}
        </div>
      ) : (
        <p>Loading server information...</p>
      )}
    </div>
  );
}


export default SingleSpot;
