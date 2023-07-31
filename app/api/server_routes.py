from flask import Blueprint, jsonify, session, request
from app.models import User, Server, db
from flask_login import current_user, login_required
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

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

@login_required
@server_routes.route('/create', methods = ['POST'])
def create_server():
    """
    Adds a new server and adds the creator to the server as a member
    """

    form = CreateServerForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        response = Server(
            name=form.data['name'],
            owner_id=current_user.id)

        description = form.data['description']
        response.description = description if description != Null else ""

        server_image = form.data['server_image']
        response.server_image = server_image if server_image != Null else ""

        banner_image = form.data['banner_image']
        response.banner_image = banner_image if banner_image != Null else ""

        


