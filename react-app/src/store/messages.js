// action types
const LOAD_CHANNEL_MESSAGES = 'sonic/messages/LOAD_CHANNEL_MESSAGES';

// action creators
export const loadChannelMessagesAction = messages => {
    return {
        type: LOAD_CHANNEL_MESSAGES,
        messages
    }
};

// thunk action creators
export const loadChannelMessagesThunk = channelId => async dispatch => {
    const res = await fetch(`/api/channels/${channelId}/messages`, {"headers": {
        "method": "GET",
        "Content-Type": "application/json"
    }});
    const data = await res.json();
    return dispatch(loadChannelMessagesAction(data));
};

// reducer
const initialState = {}

const messagesReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_CHANNEL_MESSAGES:
            newState = {};
            action.messages.forEach(
                message => newState[message.id] = message
            );
            return newState;
        default:
            return state;
    };
};

export default messagesReducer;
