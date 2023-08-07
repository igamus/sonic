
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadSingleServerThunk, leaveServerThunk, joinServerThunk } from '../../../store/servers';
import { Link, useParams, useHistory } from 'react-router-dom/';
import { loadServerChannelsThunk } from '../../../store/channels';


import "./IndividualServer.css";

import OpenModalButton from "../../OpenModalButton";

import DeleteModal from "../../DeleteModal";
import UpdateChannelModal from "../../Channel/Update/UpdateChannelModal";

import ServerManagerModal from "../ServerManagerModal";

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


  const user = useSelector((state) => state.session.user);
  let ownerUser = server.users?.filter((user) => user.id == server.ownerId);
  if (!ownerUser) {
    return null;
  }

  console.log("o1", ownerUser);
  ownerUser = ownerUser[0];
  console.log("o2", ownerUser);
  const userId = user.id;
  const isOwner = userId === server.ownerId;
  const inServer = serverUsers.includes(userId);
  const leaveServer = async () => {
    dispatch(leaveServerThunk(serverId)).then((responseData) => {
      if (responseData.error) {
        // pray
      } else {
        history.push("/me");
      }
    });

  }

  const joinServer = async () => {
    dispatch(joinServerThunk(serverId)).then(() => history.push("/me"));
  };


  const back = () => {
    history.push("/me");
  };

  return (
    <div>
      <div className="sidenavz">
        <div className="wrapperzz">
          <NavLink to="/me" className="squircle purple-boi  purlink">
            <svg aria-hidden="false" width="28" height="20" viewBox="0 0 28 20">
              <path
                fill="currentColor"
                d="M20.6644 20C20.6644 20 19.8014 18.9762 19.0822 18.0714C22.2226 17.1905 23.4212 15.2381 23.4212 15.2381C22.4384 15.881 21.5034 16.3334 20.6644 16.6429C19.4658 17.1429 18.3151 17.4762 17.1884 17.6667C14.887 18.0953 12.7774 17.9762 10.9795 17.6429C9.61301 17.381 8.43836 17 7.45548 16.6191C6.90411 16.4048 6.30479 16.1429 5.70548 15.8096C5.63356 15.7619 5.56164 15.7381 5.48973 15.6905C5.44178 15.6667 5.41781 15.6429 5.39384 15.6191C4.96233 15.381 4.7226 15.2143 4.7226 15.2143C4.7226 15.2143 5.87329 17.1191 8.91781 18.0238C8.19863 18.9286 7.31164 20 7.31164 20C2.0137 19.8333 0 16.381 0 16.381C0 8.7144 3.45205 2.50017 3.45205 2.50017C6.90411 -0.07123 10.1884 0.000197861 10.1884 0.000197861L10.4281 0.285909C6.11301 1.52399 4.12329 3.40493 4.12329 3.40493C4.12329 3.40493 4.65068 3.11921 5.53767 2.71446C8.10274 1.59542 10.1404 1.2859 10.9795 1.21447C11.1233 1.19066 11.2432 1.16685 11.387 1.16685C12.8493 0.976379 14.5034 0.92876 16.2295 1.11923C18.5068 1.38114 20.9521 2.0478 23.4452 3.40493C23.4452 3.40493 21.5514 1.61923 17.476 0.381146L17.8116 0.000197861C17.8116 0.000197861 21.0959 -0.07123 24.5479 2.50017C24.5479 2.50017 28 8.7144 28 16.381C28 16.381 25.9623 19.8333 20.6644 20ZM9.51712 8.88106C8.15068 8.88106 7.07192 10.0715 7.07192 11.5239C7.07192 12.9763 8.17466 14.1667 9.51712 14.1667C10.8836 14.1667 11.9623 12.9763 11.9623 11.5239C11.9863 10.0715 10.8836 8.88106 9.51712 8.88106ZM18.2671 8.88106C16.9007 8.88106 15.8219 10.0715 15.8219 11.5239C15.8219 12.9763 16.9247 14.1667 18.2671 14.1667C19.6336 14.1667 20.7123 12.9763 20.7123 11.5239C20.7123 10.0715 19.6336 8.88106 18.2671 8.88106Z"
              ></path>
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

      {server ? (
        <div>
          <div className="friendsz">
            <h1 className="server-name">
              {server.name}
              {isOwner ? " " : null}
              {isOwner ? (
                <OpenModalButton
                  modalComponent={<ServerManagerModal server={server} />}
                  buttonText="&#x2699;"
                  className={"server-emoji-button"}
                />
              ) : null}
            </h1>
            <img
              className="singleimgban"
              src={server.bannerImage}
              alt="Server Image"
            />
            <img
              className="singleimg"
              src={server.serverImage}
              alt="Server Image"
            />
            <p className="server-name">{server.description}</p>

            <p>Owner: {ownerUser.username} {user.username === ownerUser.username ? "(you!)" : null}</p>

            {!isOwner && inServer ? <button onClick={leaveServer} className='leave-button'>Leave Server</button> : null }
            {!inServer ? <button onClick={joinServer} id='greenjoin'>Join Server</button> : null}
            {/* Display channels */}
          </div>
          <div className="mainzz">
            <h2 className="whitenme">Channels:</h2>
            <div className="fontzme">
            {inServer ? channels.map((channel) => (
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
                      modalComponent={
                        <DeleteModal type={"channel"} id={channel.id} />
                      }
                      buttonText="&#128465;"
                      className={"server-emoji-button"}
                    />
                  </>
                ) : null}
              </p>
            )) :
            <div>
              <h2 className="whitenme">Join {server.name} to join the conversation!</h2>
              <div className="whitenme">{channels.map((channel) => <p>{channel.name}</p>)}</div>
            </div>}
            </div>
          </div>
          <div className="statuszz">
            <div className="wrapperzz">
              <h3 className="whitenme">Users:</h3>
              {server.users?.map((user) => (
                <p>
                  <p className="whitenme">Name: {user.username} </p>
                  <img id="logged-in-user-image" src={user.profilePic} />
                </p>
              ))}
              {channels.length === 0 && (
                <p>No channels available for this server.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading server information...</p>
      )}
    </div>
  );
};

export default SingleSpot;
