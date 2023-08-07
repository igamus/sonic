import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { loadChannelMessagesThunk } from '../../store/messages';
import { loadSingleChannelThunk } from '../../store/channels';
import Chat from '../MessagePane';
import './Channel.css'
import { loadSingleServerThunk } from '../../store/servers';
const Channel = () => {
  const { serverId, channelId } = useParams();
  const dispatch = useDispatch();
  const channel = useSelector((state) => state.channels.singleChannel);
  const users = useSelector((state) => state.servers.singleServer.users);
  const userId = useSelector((state) => state.session.user.id)
  const history = useHistory();

  useEffect(() => {
    dispatch(loadSingleServerThunk(serverId));
    dispatch(loadSingleChannelThunk(channelId));
    dispatch(loadChannelMessagesThunk(channelId)); // Fetch messages for the channel
  }, [dispatch, channelId]);

  const back = () => {
    history.push(`/servers/${channel.server_id}`)
  }

  if (users && userId) {
    const userTest = users.filter(user => user.id === userId);
    if (!userTest.length) back();
  }

  return (
    <div className='channel-page'>
      <div className='sidenavz'>
        <button className="back-button" onClick={back}>&#11013; Back</button>
      </div>
      {channel && (
        <>
          <div className='friendsz'>
            <h1>{channel.name}</h1>
            <p>{channel.description}</p>
          </div>

          <div className='mainz'>
            <h2>Messages:</h2>
            <Chat channelId={channel.id} />
          </div>
        </>
      )}
    </div>
  );
};

export default Channel;
