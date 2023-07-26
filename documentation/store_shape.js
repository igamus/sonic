store = {
  session: {
    user: {}
  },
  server: {
    allServers: {
      owned: {
        [serverId]: {
          serverData
        }
      },
      joined: {
        [serverId]: {
          serverData
        }
      },
    },
    singleServer: {
      serverData,
      [Users]: {
        userData
      },
      Owner: {
        ownerData
      }
    }
  },
  channels: {
    serverChannels: {
      [channelId]: {
        channelData
      }
    },
    singleChannel: {
      channelData
    }
  },
  messages: {
    channelMessages: {
      [messageId]: {
        messageData,
        Owner: {
          ownerData
        },
        [Reactions]: {
          reactionData
        }
      }
    }
  },
}
