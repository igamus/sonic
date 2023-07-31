// action types
const LOAD_USER_SERVERS = 'sonic/servers/LOAD_USER_SERVERS';

// action creators
export const loadUserServersAction = servers => {
    return {
        type: LOAD_USER_SERVERS,
        servers
    }
};

// thunk action creators
export const loadUserServersThunk = () => async dispatch => {
    const res = await fetch("/api/servers/current");
    const data = await res.json();
    return dispatch(loadUserServersAction(data));
};

// reducer
const initialState = { allServers: { {} }, singleServer: {}  }

const serversReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_USER_SERVERS:
            newState = { ...state, allServers: {} };
            action.servers.forEach(
                server => newState.allServers[server.id] = server
            );
            return newState;
        default:
            return state;
    };
};

export default serversReducer;
