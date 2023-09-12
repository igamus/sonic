import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { loadChannelMessagesThunk } from '../../store/messages';
import { loadSingleChannelThunk } from '../../store/channels';
import Chat from '../MessagePane';
import './Channel.css'

import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

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
    if (!userTest.length) history.push(`/servers/${serverId}`);
  }

  return (
    <div className='channel-page'>
      <div className='sidenavz'>

      <div className="wrapperzz">
          <NavLink to="/me" className="squircle purple-boi  purlink">
            <svg fill="currentColor" width="35" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1333.3 1062.26" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd">
              <g id="Layer_x0020_1">
                <g id="_1473327709744">
                  <path class="fil0" d="M512.04 551.2c-39.86 7.98-39.86 55.8-31.89 119.6 7.98 71.75 31.89 119.6 71.76 111.63 39.87 0 39.87-55.82 31.9-119.6-7.97-63.78-23.93-111.63-71.76-111.63z"/>
                  <path class="fil0" d="M1333.3 630.93s-23.94-111.61-143.53-207.29c-111.63-79.74-231.23-71.77-231.23-71.77s31.9-63.79 119.6-111.63c79.74-39.87 191.35-47.82 191.35-47.82s-71.75-87.72-215.27-143.53C878.8-14.9 735.29-14.9 559.87 40.92 368.5 104.71 232.96 256.2 232.96 256.2S41.6 200.38 9.7 248.21c-39.86 47.86 55.82 231.24 55.82 231.24S41.59 535.26 49.56 638.9c7.98 111.63 71.78 191.38 71.78 191.38-31.9 7.95-63.79 23.9-63.79 47.82 0 23.93 47.84 47.85 103.65 47.85h23.93c55.8 55.8 135.54 127.55 255.14 135.53 151.49 7.97 247.17-47.82 310.96-63.78 71.75-23.93 175.41-23.93 239.19-23.93 191.36 23.93 271.08 71.78 271.08 71.78s7.97-87.73-71.75-207.33c-63.79-87.7-191.37-119.58-191.37-119.58s63.79-55.82 143.53-71.78c103.67-23.89 191.38-15.94 191.38-15.94zM121.36 766.48c-15.95-31.9-23.93-63.78-31.9-159.48 0-47.82 15.95-103.63 39.86-111.61 31.9-7.97 31.9 47.85 47.85 95.69 0 15.92 15.94 39.85 23.91 63.78-7.97-7.98-7.97-7.98-7.97 0-23.91 0-31.89 47.85-15.94 103.65 7.97 31.9 23.91 63.8 39.86 71.78-15.95 0-31.89-7.97-55.81-7.97 0 0-7.97 0-7.97 7.97-7.98-15.98-23.93-39.88-31.89-63.81zm494.33 0c-39.86 79.73-103.65 103.65-175.41 103.65-71.78 0-119.6-39.85-191.37-31.9 15.96-15.93 15.96-55.8 7.97-103.65-7.97-7.97-7.97-15.93-15.95-31.87 23.94 15.95 39.87-7.97 39.87-7.97s7.96-119.6 47.83-199.34c31.89-63.78 79.73-111.63 151.49-119.59 63.79-15.95 111.63 31.89 135.54 103.65 23.93 71.74 31.91 207.3.01 287.02z"/>
                </g>
              </g>
            </svg>
            <div className="popper-boi">
              <h4 className="popper-text">Home</h4>
            </div>
          </NavLink>
          <button className="back-button" onClick={back}>
            &#11013; Back
          </button>
        </div>

      </div>
      {channel && (
        <>
          <div className='friendsz'>
            <h1 className='channel-name'>{channel.name}</h1>
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
