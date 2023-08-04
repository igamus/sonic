// action types -------------------------------------------------------
const LOAD_USER_SERVERS = "sonic/servers/LOAD_USER_SERVERS";
const CREATE_SERVER = "sonic/servers/CREATE_SERVER";
const UPDATE_SERVER = "sonic/servers/UPDATE_SERVERS";
const DELETE_SERVER = "sonic/servers/DELETE_SERVER";
const LOAD_SINGLE_SERVER = "sonic/servers/LOAD_SINGLE_SERVER";
const LOAD_ALL_SERVERS = "sonic/servers/LOAD_ALL_SERVERS";
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

export const updateServerAction = (server) => {
  return {
    type: UPDATE_SERVER,
    server,
  };
};

export const deleteServerAction = (serverId) => {
  return {
    type: DELETE_SERVER,
    serverId,
  };
};

export const loadSingleServerAction = (server) => {
  return {
    type: LOAD_SINGLE_SERVER,
    server,
  };
};

export const loadAllServersAction = (servers) => {
  return {
    type: LOAD_ALL_SERVERS,
    servers,
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


export const updateServerThunk = (form) => async (dispatch) => {
  console.log('server form dispatch', form)
  const res = await fetch(`/api/servers/${form.get('id')}`, {
    method: "PUT",
    body: form,
  });
  const updatedServer = await res.json();
  if (res.ok) {

    dispatch(updateServerAction(updatedServer));
    return updatedServer;
  } else {
    return updatedServer;
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

export const leaveServerThunk = (serverId) => async (dispatch) => {
  const res = await fetch(`/api/servers/${serverId}/leave`, {
    method: "DELETE"
  })
  return res;
}

export const loadSingleServerThunk = (serverId) => async (dispatch) => {
  const res = await fetch(`/api/servers/${serverId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const serverData = await res.json();
    dispatch(loadSingleServerAction(serverData));
    return serverData;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const loadAllServersThunk = () => async (dispatch) => {
  const res = await fetch("/api/servers/all", {
    headers: {
      method: "GET",
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(loadAllServersAction(data));
    return data;
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
    case LOAD_SINGLE_SERVER:
      return {
        ...state,
        singleServer: action.server,
      };
    case LOAD_ALL_SERVERS:
      newState = { ...state, allServers: {} };
      action.servers.forEach(
        (server) => (newState.allServers[server.id] = server)
      );
      return newState;
    default:
      return state;
  }
};

export default serversReducer;
