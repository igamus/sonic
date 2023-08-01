from flask import Blueprint, jsonify, session, request
from app.models import User, Server, Channel, db
from app.forms import CreateServerForm
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
        newServer = Server(
            name=form.data['name'],
            owner_id=current_user.id)

        description = form.data['description']
        newServer.description = description if description != None else ""

        server_image = form.data['server_image']
        server_image.filename = get_unique_filename(server_image.filename)
        uploadServerImage = upload_file_to_s3(server_image)
        if 'url' not in uploadServerImage:
            return uploadServerImage
        else:
            newServer.server_image = uploadServerImage['url']

        banner_image = form.data['banner_image']
        banner_image.filename = get_unique_filename(banner_image.filename)
        uploadBannerImage = upload_file_to_s3(banner_image)
        if 'url' not in uploadBannerImage:
            return uploadBannerImage
        else:
            newServer.banner_image = uploadBannerImage['url']

        db.session.add(newServer)
        db.session.commit()

        newChannel = Channel(server_id=newServer.id, name='General', description='')
        db.session.add(newChannel)
        db.session.commit()

        newServer.channels.append(newChannel)
        newServer.server_memberships.append(current_user)
        db.session.commit()

        server_dict = newServer.to_dict()
        server_dict['general_channel_id'] = newChannel.id
        print ('success server route')
        return server_dict
    else:
        print ('fail server route')
        return form.errors, 400