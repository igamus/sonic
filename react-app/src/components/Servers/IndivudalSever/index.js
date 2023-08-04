import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadSingleServerThunk } from '../../../store/servers';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { loadServerChannelsThunk } from '../../../store/channels';
import OpenModalButton from '../../OpenModalButton';
import DeleteChannelModal from '../../Channel/Delete/DeleteChannelModal';
import UpdateChannelModal from '../../Channel/Update/UpdateChannelModal';
import CreateChannelModal from '../../Channel/Create/CreateChannelModal';
const SingleSpot = () => {
  const { serverId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSingleServerThunk(serverId));
    dispatch(loadServerChannelsThunk(serverId));
  }, [dispatch, serverId]);

  const server = useSelector((state) => state.servers.singleServer);
  const channels = useSelector((state) => Object.values(state.channels.serverChannels));
  const userId = useSelector(state => state.session.user.id);
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
          {
                    userId === server.ownerId
                        ?
                    <OpenModalButton
                        modalComponent={<CreateChannelModal serverId={server.id} />}
                        buttonText={"+"}
                    />
                        :
                    null
                }
         {channels.map((channel) => (
  <div key={channel.id}>
    <Link to={`/servers/${serverId}/${channel.id}`}>
      <p>{channel.name}</p>
    </Link>
    {userId === server.ownerId ? (
      <>
        <OpenModalButton
          modalComponent={<UpdateChannelModal channel={channel} />}
          buttonText={"Update Channel"}
        />
        <OpenModalButton
          modalComponent={<DeleteChannelModal type={"channel"} id={channel.id} />}
          buttonText={"Delete Channel"}
        />
      </>
    ) : null}
  </div>
))}

          <h3>Users:</h3>
          {server.users?.map((user) => (<p><p>Name: {user.username} </p><img src={user.profilePic} /></p>

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
