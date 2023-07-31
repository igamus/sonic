import './UserHome.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadUserServersThunk } from '../../store/servers';
import ChannelsList from '../ChannelsList';

function UserHome() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUserServersThunk())
    }, [dispatch]);

    const servers = useSelector(state => Object.values(state.servers.allServers));
    console.log('servers:', servers);
    const [activeServer, setActiveServer] = useState(servers[0]);

    return (
        <div>
            <h1>Welcome, User!</h1>
            <div>
                <h2>Servers You're In</h2>
                {servers.map(server => (
                    <div>
                        <h3
                            onClick={e => setActiveServer(server)}
                        >{server.name}</h3>
                    </div>
                ))}
                {activeServer && <ChannelsList server={activeServer} />}
            </div>
        </div>
    )
};

export default UserHome;
