import './ChannelsList.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadServerChannelsThunk } from '../../store/channels';

function ChannelsList() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadServerChannelsThunk());
    }, [dispatch]);
    const channels = useSelector(state => Object.values(state.channels.serverChannels));
    console.log('channels:', channels)

    return (
        <div>
            <h2>Channels for This Server:</h2>
            {channels.map(channel => (
                <h3>{channel.name}</h3>
            ))}
        </div>
    );
};

export default ChannelsList;
