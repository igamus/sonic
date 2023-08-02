import './ChannelMessages.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadChannelMessagesThunk } from '../../store/messages';

function ChannelMessages({ channel }) {
    const dispatch = useDispatch();
    useEffect(() => {
        if (channel?.id) dispatch(loadChannelMessagesThunk(channel.id));
    }, [dispatch]);
    const messages = useSelector(state => Object.values(state.messages));
    return (
        <div>
            {
                messages.length
                    ?
                    <>{messages.map(message => (
                        <div>
                            <p>{message.user.username} says...</p>
                            <p>{message.text}</p>
                        </div>)
                    )}</>
                    :
                    <p>Be the first to say something!</p>
            }
        </div>
    );
};

export default ChannelMessages;
