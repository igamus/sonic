// action types
const LOAD_SERVER_CHANNELS = 'sonic/channels/LOAD_SERVER_CHANNELS';
const CREATE_CHANNEL = 'sonic/channels/CREATE_CHANNEL';

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

// thunk action creators
export const loadServerChannelsThunk = serverId => async dispatch => {
    const res = await fetch(`/api/servers/${serverId}/channels`, {"headers": {
        "method": "GET",
        "Content-Type": "application/json"
    }});
    const data = await res.json();
    return dispatch(loadServerChannelsAction(data));
};

export const createChannelThunk = formData => async dispatch => {
    const serverId = formData.serverId;
    const res = await fetch(`/api/servers/${serverId}/channels`,
    {
        "headers": {
            "method": "POST",
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({
            name: formData.name,
            description: formData.description
        })
    });

    if (res.ok) {
        const data = await res.json();
        return dispatch(createChannelAction(data))
    } else {
        const errors = await res.json();
        return errors;
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
                    ...newState.serverChannels,
                    [action.channel.id]: action.channel
                }
            };
            return newState;
        default:
            return state;
    };
};

export default channelsReducer;
