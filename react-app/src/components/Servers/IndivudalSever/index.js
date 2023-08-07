import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadSingleServerThunk, leaveServerThunk, joinServerThunk } from '../../../store/servers';
import { Link, useParams, useHistory } from 'react-router-dom/';
import { loadServerChannelsThunk } from '../../../store/channels';

import "./IndividualServer.css";

import OpenModalButton from "../../OpenModalButton";

import DeleteModal from '../../DeleteModal';
import UpdateChannelModal from '../../Channel/Update/UpdateChannelModal';

import ServerManagerModal from '../ServerManagerModal';

const SingleSpot = () => {
  const { serverId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(loadSingleServerThunk(serverId));
    dispatch(loadServerChannelsThunk(serverId));
  }, [dispatch, serverId]);

  const server = useSelector((state) => state.servers.singleServer);
  const channels = useSelector((state) => Object.values(state.channels.serverChannels));
  const serverUserObjects = useSelector((state) => state.servers.singleServer.users);
  const serverUsers = serverUserObjects?.map(user => user.id) || '';
  console.log('serverusrers:', serverUsers)

  const user = useSelector((state) => state.session.user)
  let ownerUser = (server.users?.filter(user => user.id == server.ownerId));
  if (!ownerUser) {
    return null;
  }


  console.log('o1', ownerUser)
  ownerUser = ownerUser[0]
  console.log('o2', ownerUser)
  const userId = user.id;
  const isOwner = userId === server.ownerId
  const leaveServer = async () => {
    dispatch(leaveServerThunk(serverId)).then(responseData => {
      if (responseData.error) {
        // pray
      } else {
        history.push('/me')
      }
    });
  }

  const joinServer = async () => {
    dispatch(joinServerThunk(serverId)).then(() => history.push("/me"));
  };

  const back = () => {
    history.push('/me')
  }

  return (
    <div>
      <button onClick={back} className='back'>&#11013; Back</button>
      {server ?
        (
          <div>
            <h1>
              {server.name}
              { isOwner ? " " : null }
              { isOwner ? <OpenModalButton modalComponent={<ServerManagerModal server={server} />} buttonText="&#x2699;" className={"server-emoji-button"} /> : null }
            </h1>
            <p>{server.description}</p>
            <p>Owner: {ownerUser.username} {user.username === ownerUser.username ? "(you!)" : null}</p>
            <div><img src={server.serverImage} alt="Server Image" /></div>
            {!isOwner && serverUsers.includes(userId) ? <button onClick={leaveServer} className='leave-button'>Leave Server</button> : null }
            {!serverUsers.includes(userId) ? <button onClick={joinServer} id='greenjoin'>Join Server</button> : null}
            {/* Display channels */}
            <h2>Channels:</h2>
            {channels.map((channel) => (
              <p key={channel.id}>
                <Link to={`/servers/${serverId}/${channel.id}`}>
                  {channel.name}
                </Link>
                {isOwner ? (
                  <>
                    <OpenModalButton
                      modalComponent={<UpdateChannelModal channel={channel} />}
                      buttonText="&#x1F4DD;"
                      className={"server-emoji-button"}
                    />
                    <OpenModalButton
                      modalComponent={<DeleteModal type={"channel"} id={channel.id} />}
                      buttonText="&#128465;"
                      className={"server-emoji-button"}
                    />
                  </>
                ) : null}
              </p>
            ))}
            <h3>Users:</h3>
            {server.users?.map((user) => (<p><p>Name: {user.username} </p><img src={user.profilePic} /></p>))}
            {channels.length === 0 && <p>No channels available for this server.</p>}
          </div>
        )
        : (
          <p>Loading server information...</p>
        )}

    </div>
  )
}



export default SingleSpot;
