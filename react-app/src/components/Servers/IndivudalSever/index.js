import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadSingleServerThunk } from '../../../store/servers';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { loadServerChannelsThunk } from '../../../store/channels';
import ServerFormUpdateModal from '../../ServerFormUpdateModal'
import OpenModalButton from "../../OpenModalButton";
const SingleSpot = () => {
  const { serverId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSingleServerThunk(serverId));
    dispatch(loadServerChannelsThunk(serverId));
  }, [dispatch, serverId]);

  const server = useSelector((state) => state.servers.singleServer);
  const channels = useSelector((state) => Object.values(state.channels.serverChannels));
  const user = useSelector((state) => state.session.user)
  let ownerUser = (server.users?.filter(user => user.id == server.ownerId));
  if (!ownerUser) {
    return null;
  }
  console.log('o1', ownerUser)
  ownerUser = ownerUser[0]
  console.log('o2', ownerUser)
  return (
    <div>
      {server ?
        (
          <div>
            <h1>Single Server Info</h1>
            <p>Name: {server.name}</p>
            <p>Description: {server.description}</p>
            <p>Owner: {ownerUser.username}</p>
            <img src={server.serverImage} alt="Server Image" />
            {/* Display channels */}
            <h2>Channels:</h2>
            {channels.map((channel) =>
            (
              <Link key={channel.id} to={`/servers/${serverId}/${channel.id}`}>
                <p>{channel.name}</p>
              </Link>
            )
            )
            }
            <h3>Users:</h3>
            {server.users?.map((user) => (<p><p>Name: {user.username} </p><img src={user.profilePic} /></p>))}
            {channels.length === 0 && <p>No channels available for this server.</p>}
            {user.id == server.ownerId ?
              (<OpenModalButton
                modalComponent={<ServerFormUpdateModal title='Update Server' server={server} />}
                buttonText='Update Server' />) : (<div />)}
          </div>
        )
        : (
          <p>Loading server information...</p>
        )}
    </div>
  )
}



export default SingleSpot;
