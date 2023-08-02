import './ChannelMessages.css';
import Chat from '../MessagePane';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadChannelMessagesThunk } from '../../store/messages';

function ChannelMessages({ channel }) {
    const dispatch = useDispatch();
    useEffect(() => {
        if (channel?.id) dispatch(loadChannelMessagesThunk(channel.id));
    }, [dispatch]);
    return (
        <div>
            <p>{channel.name}</p>
            <Chat channelId={channel.id} />
        </div>
    );
};

export default ChannelMessages;
