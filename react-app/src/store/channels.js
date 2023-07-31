// action types
const LOAD_SERVER_CHANNELS = 'sonic/channels/LOAD_SERVER_CHANNELS';

// action creators
export const loadServerChannelsAction = channels => {
    return {
        type: LOAD_SERVER_CHANNELS,
        channels
    }
};

// thunk action creators
export const loadServerChannelsThunk = () => async dispatch => {
    const res = await fetch("/api/channels/current", {"headers": {
        "method": "GET",
        "Content-Type": "application/json"
    }});
    const data = await res.json();
    return dispatch(loadServerChannelsAction(data));
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
        default:
            return state;
    };
};

export default channelsReducer;
