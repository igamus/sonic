import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { loadChannelMessagesThunk } from '../../store/messages';
import { loadSingleChannelThunk } from '../../store/channels';
import Chat from '../MessagePane';
import './Channel.css'
const Channel = () => {
  const { channelId } = useParams();
  const dispatch = useDispatch();
  const channel = useSelector((state) => state.channels.singleChannel);
  const messages = useSelector((state) => Object.values(state.messages));
  const history = useHistory();
  useEffect(() => {
    dispatch(loadSingleChannelThunk(channelId));
    dispatch(loadChannelMessagesThunk(channelId)); // Fetch messages for the channel
  }, [dispatch, channelId]);
  const back = () => {
    history.push('/me')
  }

  return (
    <div>
      <div className='sidenavz'>
      <button onClick={back}>Back</button>
      </div>
      {channel && (
          <>
        <div className='friendsz'>
          <h1>Channel Name: {channel.name}</h1>
          <p>Description: {channel.description}</p>
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
