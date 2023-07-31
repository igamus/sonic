import './UserHome.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUserServersThunk } from '../../store/servers';
import ChannelsList from '../ChannelsList';

function UserHome() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUserServersThunk())
    }, [dispatch]);

    const servers = useSelector(state => Object.values(state.servers.allServers));
    console.log('servers:', servers);

    return (
        <div>
            <h1>Welcome, User!</h1>
            <div>
                <h2>Servers You're In</h2>
                {servers.map(server => (
                    <div>
                        {servers.name}
                    </div>
                ))}

            </div>
            <ChannelsList />
        </div>
    )
};

export default UserHome;
