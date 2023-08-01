// action types
const LOAD_SERVER_CHANNELS = 'sonic/channels/LOAD_SERVER_CHANNELS';
const CREATE_CHANNEL = 'sonic/channels/CREATE_CHANNEL';
const DELETE_CHANNEL = 'sonic/channels/DELETE_CHANNEL';

// action creators
export const loadServerChannelsAction = channels => {
    return {
        type: LOAD_SERVER_CHANNELS,
        channels
    }
};

export const createChannelAction = channel => {
    return {
        type: CREATE_CHANNEL,
        channel
    }
};

export const deleteChannelAction = channelId => {
    return {
        type: DELETE_CHANNEL,
        channelId
    }
};

// thunk action creators
export const loadServerChannelsThunk = serverId => async dispatch => {
    const res = await fetch(`/api/servers/${serverId}/channels`, {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json"
        }
    });
    const data = await res.json();
    return dispatch(loadServerChannelsAction(data));
};

export const createChannelThunk = formData => async dispatch => {
    const res = await fetch(`/api/servers/${formData.serverId}/channels`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({
            name: formData.name,
            description: formData.description,
        })
    });

    if (res.ok) {
        const data = await res.json();
        console.log('res was good:', data);
        return dispatch(createChannelAction(data))
    } else {
        const errors = await res.json();
        console.log('res was bad:', errors)
        return errors;
    }
};

export const deleteChannelThunk = channelId => async dispatch => {
    const res = await fetch(`/api/channels/${channelId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        return dispatch(deleteChannelAction(channelId));
    } else {
        return {"message": "There was a problem deleting the channel"};
    }
};

// reducer
const initialState = { serverChannels: {}, singleChannel: {}  }

const channelsReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_SERVER_CHANNELS:
            newState = { ...state, serverChannels: {} };
            action.channels.forEach(
                channel => newState.serverChannels[channel.id] = channel
            );
            return newState;
        case CREATE_CHANNEL:
            newState  = {
                ...state,
                serverChannels: {
                    ...state.serverChannels,
                    [action.channel.id]: action.channel
                }
            };
            return newState;
        case DELETE_CHANNEL:
            newState = {
                ...state,
                serverChannels: {
                    ...state.serverChannels
                }
            };
            delete newState.serverChannels[action.channelId];
            return newState;
        default:
            return state;
    };
};

export default channelsReducer;
