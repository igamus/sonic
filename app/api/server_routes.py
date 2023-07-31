from flask import Blueprint, jsonify, session, request
from app.models import User, Server, db
from flask_login import current_user, login_required

server_routes = Blueprint('server', __name__)

@server_routes.route('/current')
@login_required
def current_servers():
    """
    Returns a list of the servers current user is a member of.
    """
    serverList = []
    servers = current_user.servers
    for server in servers:
        serverList.append(server.to_dict())

    return serverList

@server_routes.route('/<int:serverId>/channels')
@login_required
def server_channels(serverId):
    """
    Returns a list of the channels on the specified server.
    """

    server = Server.query.filter(Server.id == serverId).first()

    channelList = []
    for channel in server.channels:
        channelList.append(channel.to_dict())

    print (channelList)

    return channelList