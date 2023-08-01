import "./UserHome.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteServerThunk, loadUserServersThunk } from "../../store/servers";
import { loadServerChannelsThunk } from "../../store/channels";
import ChannelsList from "../ChannelsList";

function UserHome() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserServersThunk());
  }, [dispatch]);

    const servers = useSelector(state => Object.values(state.servers.allServers));
    const [activeServer, setActiveServer] = useState(servers[0]);
  const servers = useSelector((state) =>
    Object.values(state.servers.allServers)
  );
  console.log("servers:", servers);
  const [activeServer, setActiveServer] = useState(servers[0]);

  const handleDeleteServer = (serverId) => {
    dispatch(deleteServerThunk(serverId))
      .then(() => {
        console.log("Server deleted successfully!");
        dispatch(loadUserServersThunk());
      })
      .catch((error) => {
        console.error("Error deleting server:", error);
      });
  };

  return (
    <div>
      <h1>Welcome, User!</h1>
      <div>
        <h2>Servers You're In</h2>
        {servers.map((server) => (
          <div>
            <h3
              onClick={(e) => {
                dispatch(loadServerChannelsThunk(server.id));
                setActiveServer(server);
              }}
            >
              <img src={server.serverImage} alt="Server Thumbnail" />
              <img src={server.bannerImage} alt="Server Banner" />
              {server.name}
            </h3>
            <button onClick={() => handleDeleteServer(server.id)}>
              Delete
            </button>
          </div>
        ))}
        {activeServer && <ChannelsList server={activeServer} />}
      </div>
    </div>
  );
}

export default UserHome;
