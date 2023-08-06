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
  const history = useHistory();
  useEffect(() => {
    dispatch(loadSingleChannelThunk(channelId));
    dispatch(loadChannelMessagesThunk(channelId)); // Fetch messages for the channel
  }, [dispatch, channelId]);
  const back = () => {
    history.push(`/servers/${channel.server_id}`)
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
