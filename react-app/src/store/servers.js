// action types -------------------------------------------------------
const LOAD_USER_SERVERS = "sonic/servers/LOAD_USER_SERVERS";
const CREATE_SERVER = "sonic/servers/CREATE_SERVER";
const UPDATE_SERVER = "sonic/servers/UPDATE_SERVERS";
const DELETE_SERVER = "sonic/servers/DELETE_SERVER";
// action creators ---------------------------------------------------
export const loadUserServersAction = (servers) => {
  return {
    type: LOAD_USER_SERVERS,
    servers,
  };
};

export const createServerAction = (server) => ({
  type: CREATE_SERVER,
  payload: server,
});

export const updateServersAction = (servers) => {
  return {
    type: UPDATE_SERVER,
    servers,
  };
};

export const deleteServerAction = (serverId) => {
  return {
    type: DELETE_SERVER,
    serverId,
  };
};

// thunk action creators ---------------------------
export const loadUserServersThunk = () => async (dispatch) => {
  const res = await fetch("/api/servers/current", {
    headers: {
      method: "GET",
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return dispatch(loadUserServersAction(data));
};

export const createServerThunk = (formData) => async (dispatch) => {
  const response = await fetch("/api/servers/create", {
    method: "POST",
    body: formData,
  });

  const serverData = await response.json();

  if (response.ok) {
    dispatch(createServerAction(serverData));
    return serverData;
  } else {
    return serverData.errors;
  }
};

export const updateServerThunk = (server) => async (dispatch) => {
  const res = await fetch(`/api/servers/${server.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(server),
  });
  if (res.ok) {
    const updatedServer = await res.json();
    dispatch(updateServersAction(updatedServer));
    return updatedServer;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const deleteServerThunk = (serverId) => async (dispatch) => {
  const res = await fetch(`/api/servers/${serverId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    dispatch(deleteServerAction(serverId));
  } else {
    const errors = await res.json();
    return errors;
  }
};

// reducer----------------------------------------------------------------------------------------------------------
const initialState = { allServers: {}, singleServer: {} };
// --------------------------------------------------------------------------------------------------------
const serversReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case LOAD_USER_SERVERS:
      newState = { ...state, allServers: {} };
      action.servers.forEach(
        (server) => (newState.allServers[server.id] = server)
      );
      return newState;
    case CREATE_SERVER:
      newState = { ...state };
      let newServer = action.payload;

      newState.allServers[newServer.id] = newServer;
      newState.singleServer = newServer;

      return newState;
    case UPDATE_SERVER:
      newState = {
        ...state,
        allServers: {
          ...state.allServers,
          [action.server.id]: action.server,
        },
      };
      return newState;
    case DELETE_SERVER:
      const { [action.serverId]: deletedServer, ...remainingServers } =
        state.allServers;
      return {
        ...state,
        allServers: remainingServers,
      };
    default:
      return state;
  }
};

export default serversReducer;
