// action types
const LOAD_CHANNEL_MESSAGES = 'sonic/messages/LOAD_CHANNEL_MESSAGES';
const DELETE_MESSAGE = 'sonic/messages/DELETE_MESSAGE';

// action creators
export const loadChannelMessagesAction = messages => {
    return {
        type: LOAD_CHANNEL_MESSAGES,
        messages
    }
};

export const deleteMessageAction = messageId => {
    return {
        type: DELETE_MESSAGE,
        messageId
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

export const deleteMessageThunk = messageId => async dispatch => {
    const res = await fetch(`/api/messages/${messageId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        return dispatch(deleteMessageAction(messageId));
    } else {
        return {"message": "There was a problem deleting the channel"};
    }
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
        case DELETE_MESSAGE:
            newState = { ...state};
            delete newState[action.messageId];
            return newState;
        default:
            return state;
    };
};

export default messagesReducer;
