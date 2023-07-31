from flask import Blueprint, jsonify, session, request
from app.models import User, Server, db
from flask_login import current_user, login_required

server_routes = Blueprint('server', __name__)

@server_routes.route('/current')
@login_required
def current_servers():
    """
    Return a list of the servers current user is a member of.
    """
    serverList = []
    servers = current_user.servers
    for server in servers:
        serverList.append(server.to_dict())

    print (serverList)
    #serverList = { current_user.servers }

    return serverList
