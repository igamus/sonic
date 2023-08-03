import './ChannelMessages.css';
import Chat from '../MessagePane';

function ChannelMessages({ channel }) {
    return (
        <div>
            <p>{channel.name}</p>
            <Chat channelId={channel.id} />
        </div>
    );
};

export default ChannelMessages;
