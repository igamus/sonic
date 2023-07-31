import './UserHome.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUserServersThunk } from '../../store/servers';

function UserHome() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUserServersThunk())
    }, [dispatch]);

    const servers = useSelector(state => state.servers.allServers);
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
        </div>
    )
};

export default UserHome;
