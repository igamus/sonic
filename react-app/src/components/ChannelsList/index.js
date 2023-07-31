import './ChannelsList.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadServerChannelsThunk } from '../../store/channels';

function ChannelsList({ server }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadServerChannelsThunk(server.id));
    }, [dispatch]);
    const channels = useSelector(state => Object.values(state.channels.serverChannels));
    console.log('server channels:', channels)

    return (
        <>
            <h2>{server.name}'s Channels:</h2>
            {channels.map(channel => (
                <h3 key={`channel-${channel.id}`}>{channel.name}</h3>
            ))}
        </>
    );
};

export default ChannelsList;
