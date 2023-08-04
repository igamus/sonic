import './ChannelsList.css';
import ChannelMessages from '../ChannelMessages';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadServerChannelsThunk } from '../../store/channels';
import OpenModalButton from '../OpenModalButton';
import CreateChannelFormModal from '../CreateChannelFormModal';
import DeleteModal from '../DeleteModal';
import UpdateChannelFormModal from '../UpdateChannelFormModal';

function ChannelsList({ server }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadServerChannelsThunk(server.id));
    }, [dispatch]);
    const channels = useSelector(state => Object.values(state.channels.serverChannels));
    const userId = useSelector(state => state.session.user.id);

    const [activeChannel, setActiveChannel] = useState(null);
    // open modal
    return (
        <div>
            <div>
                <h2>{server.name}'s Channels:</h2>
                {
                    userId === server.ownerId
                        ?
                    <OpenModalButton
                        modalComponent={<CreateChannelFormModal serverId={server.id} />}
                        buttonText={"+"}
                    />
                        :
                    null
                }
            </div>
            {channels.map(channel => (
                <>
                    <h3
                        onClick={e => {
                            // dispatch(loadChannelMessagesThunk(channel.id))
                            setActiveChannel(channel)
                        }}
                        key={`channel-${channel.id}`}
                    >{channel.name}</h3>
                    {userId === server.ownerId
                        ?
                    <>
                        <OpenModalButton
                            modalComponent={<UpdateChannelFormModal channel={channel} />}
                            buttonText={"Update Channel"}
                        />
                        <OpenModalButton
                            modalComponent={<DeleteModal type={"channel"} id={channel.id} />}
                            buttonText={"Delete Channel"}
                        />
                    </>
                        :
                    null
                    }
                </>
            ))}
            {activeChannel && <ChannelMessages channel={activeChannel} />}
        </div>
    );
};

export default ChannelsList;
