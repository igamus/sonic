// action types
const LOAD_USER_SERVERS = 'sonic/servers/LOAD_USER_SERVERS';
const CREATE_SERVER = 'sonic/servers/CREATE_SERVER'
// action creators
export const loadUserServersAction = servers => {
    return {
        type: LOAD_USER_SERVERS,
        servers
    }
};

export const createServerAction = server => ({
    type: CREATE_SERVER,
    payload: server
    }
)

// thunk action creators
export const loadUserServersThunk = () => async dispatch => {
    const res = await fetch("/api/servers/current", {"headers": {
        "method": "GET",
        "Content-Type": "application/json"
    }});
    const data = await res.json();
    return dispatch(loadUserServersAction(data));
};

export const createServerThunk = (formData) => async (dispatch) => {
    const response = await fetch('/api/servers/create', {
        method: "POST",
        body: formData
    })

    const serverData = await response.json()

    if (response.ok)
    {
        dispatch(createServerAction(serverData))
        return serverData
    }
    else {
        return serverData.errors
    }
}

// reducer
const initialState = { allServers: {}, singleServer: {}  }

const serversReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_USER_SERVERS:
            newState = { ...state, allServers: {} };
            action.servers.forEach(
                server => newState.allServers[server.id] = server
            );
            return newState;
        case CREATE_SERVER:
            newState = { ...state}
            let newServer = action.payload;
            
            newState.allServers[newServer.id] = newServer;
            newState.singleServer = newServer;

            return newState;
        default:
            return state;
    };
};

export default serversReducer;
