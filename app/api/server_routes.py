from flask import Blueprint, jsonify, session, request
from app.models import User, Server, db
from flask_login import current_user, login_required
from ..forms.createchannel_form import CreateChannelForm
from ..models import db, Channel

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

@server_routes.route('/<int:serverId>/channels', methods=["GET"])
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

@server_routes.route('/<int:server_id>/channels', methods=["POST"])
@login_required
def create_channel(server_id):
    """
    Creates a new channel in the specified server
    """
    form = CreateChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_channel = Channel(
            server_id=server_id,
            description=form.data["description"],
            name=form.data["name"]
        )
        print(new_channel)
        db.session.add(new_channel)
        db.session.commit()

        return new_channel.to_dict()
    print(form.errors)
    if form.errors:
        return form.errors
    return {"error": "An unknown error has occcured"} # need error messages
