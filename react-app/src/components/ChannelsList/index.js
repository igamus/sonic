import './ChannelsList.css';
import ChannelMessages from '../ChannelMessages';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadServerChannelsThunk } from '../../store/channels';
import { loadChannelMessagesThunk } from '../../store/messages';
import OpenModalButton from '../OpenModalButton';
import CreateChannelFormModal from '../CreateChannelFormModal';
import DeleteChannelModal from '../DeleteChannelModal';
import UpdateChannelFormModal from '../UpdateChannelFormModal';

function ChannelsList({ server }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadServerChannelsThunk(server.id));
    }, [dispatch]);
    const channels = useSelector(state => Object.values(state.channels.serverChannels));
    console.log('server channels:', channels)

    const [activeChannel, setActiveChannel] = useState(null);
    // open modal
    return (
        <div>
            <div>
                <h2>{server.name}'s Channels:</h2>
                <OpenModalButton
                    modalComponent={<CreateChannelFormModal serverId={server.id} />}
                    buttonText={"+"}
                    // onButtonClick={}
                    // onModalClose={}
                />
            </div>
            {channels.map(channel => (
                <>
                    <h3
                        onClick={e => {
                            dispatch(loadChannelMessagesThunk(channel.id))
                            setActiveChannel(channel)
                            console.log('hey, you clicked it')
                        }}
                        key={`channel-${channel.id}`}
                    >{channel.name}</h3>
                    <OpenModalButton
                        modalComponent={<UpdateChannelFormModal channel={channel} />}
                        buttonText={"Update Channel"}
                    />
                    <OpenModalButton
                        modalComponent={<DeleteChannelModal channelId={channel.id} />}
                        buttonText={"Delete Channel"}
                    />
                </>
            ))}
            {activeChannel && <ChannelMessages channel={activeChannel} />}
        </div>
    );
};

export default ChannelsList;
