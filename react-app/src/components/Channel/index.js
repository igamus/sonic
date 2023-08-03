import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadChannelMessagesThunk } from '../../store/messages';
import { loadSingleChannelThunk } from '../../store/channels';
import Chat from '../MessagePane';
const Channel = () => {
    const { channelId } = useParams();
    const dispatch = useDispatch();
    const channel = useSelector((state) => state.channels.singleChannel);
    const messages = useSelector((state) => Object.values(state.messages));

    useEffect(() => {
      dispatch(loadSingleChannelThunk(channelId));
      dispatch(loadChannelMessagesThunk(channelId)); // Fetch messages for the channel
    }, [dispatch, channelId]);

    return (
      <div>
        {channel && (
          <div>
            <h1>Channel Name: {channel.name}</h1>
            <p>Description: {channel.description}</p>
            Display messages
            <h2>Messages:</h2>
            <Chat channelId={channel.id} />
          </div>
        )}
      </div>
    );
  };

  export default Channel;
