// action types
const LOAD_SERVER_CHANNELS = 'sonic/channels/LOAD_SERVER_CHANNELS';
const CREATE_CHANNEL = 'sonic/channels/CREATE_CHANNEL';
const DELETE_CHANNEL = 'sonic/channels/DELETE_CHANNEL';
const UPDATE_CHANNEL = 'sonic/channels/UPDATE_CHANNEL';
const LOAD_SINGLE_CHANNEL =  'sonic/channels/LOAD_SINGLE_CHANNEL';
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

export const updateChannelAction = data => {
    return {
        type: UPDATE_CHANNEL,
        data
    }
};

export const loadSingleChannelAction = channel => {
    return {
        type: LOAD_SINGLE_CHANNEL,
        channel
    };
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
        return dispatch(createChannelAction(data))
    } else {
        const errors = await res.json();
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

export const updateChannelThunk = formData => async dispatch => {
    const submission = {};
    if (formData.name) submission.name = formData.name;
    if (formData.description) submission.description = formData.description;

    const res = await fetch(`/api/channels/${formData.channelId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(submission)
    });

    if (res.ok) {
        const data = await res.json();
        return dispatch(updateChannelAction(data));
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const loadSingleChannelThunk = channelId => async dispatch => {
    const res = await fetch(`/api/channels/${channelId}`, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (res.ok) {
        const data = await res.json();
        return dispatch(loadSingleChannelAction(data));
    } else {
        const error = await res.json();
        console.error("Error loading channel:", error);
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
        case UPDATE_CHANNEL:
            newState = {
                ...state,
                serverChannels: {
                    ...state.serverChannels,
                    [action.data.id]: {
                        ...action.data
                    }
                }
            };

            // newState.serverChannels[action.formData.id] = { ...newState.serverChannels[action.formData.id], ...action.formData };
            return newState;
            case LOAD_SINGLE_CHANNEL:
                newState = { ...state, singleChannel: action.channel };
                return newState;
        default:
            return state;
    };
};

export default channelsReducer;
