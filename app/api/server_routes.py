from flask import Blueprint, jsonify, session, request
from app.models import User, Server, Channel, db
from app.forms import CreateServerForm, UpdateServerForm
from flask_login import current_user, login_required
from ..forms.createchannel_form import CreateChannelForm
from ..models import db, Channel
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

server_routes = Blueprint('server', __name__)

@server_routes.route('/current')
@login_required
def current_servers():
    """
    Returns a list of the servers current user is a member of.
    """
    serverList = []
    servers = current_user.user_memberships

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

    return channelList



@server_routes.route('/<int:serverId>/users', methods=["GET"])
@login_required
def server_users(serverId):
    """
    Return a list of the users in a server
    """

    server = Server.query.filter(Server.id == serverId).first()

    userList = []
    for user in server.server_memberships:
        userList.append(user.to_dict())

    return userList


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

@login_required
@server_routes.route('/<int:serverId>', methods = ['DELETE'])
def delete_server(serverId):
#  find server by id in database
    server = Server.query.get(serverId)

    if server is None:
        return jsonify({'message': "Server doesn't exist"}),404

    if current_user.id != server.owner_id:
        return jsonify({'message': 'You do not have permission to delete this server'}), 403


    db.session.delete(server)
    db.session.commit()

    return jsonify({'message': 'Server deleted success'}), 200

@login_required
@server_routes.route('/<int:serverId>', methods = ['PUT'])
def edit_server(serverId):
    # Updates the server information based on the provided server_id.
    # Only the owner of the server can perform this action.
    server = Server.query.get(serverId)
    print ('************************************************************************')
    print('put', server.name, server.description)
    if server is None:
        return jsonify({"message": "Server doesn't exist"}), 404


    if current_user.id != server.owner_id:
        return jsonify({'message': 'You do not have permission to edit this server'}), 403


    form = UpdateServerForm()
    print('form')
    print( form['name'])
    print(form.description)
    form['csrf_token'].data = request.cookies['csrf_token']
    print ('csrf', form['csrf_token'].data)
    print ('v ', form.validate_on_submit())
    if form.validate_on_submit():
        print ('form', form)
        new_name = form.data['name']
        if new_name is not None and new_name != server.name:
            print ('attempt at name change')
            duplicate_name_server = Server.query.filter_by(name=new_name).first()
            if duplicate_name_server:
                return jsonify(error = 'Server name already in use'), 400
            server.name = new_name

        new_description = form.data['description']
        if new_description is not None and new_description != server.description:
            print ('attempt at description change')
            server.description = new_description
        print(form.data)
        server_image = form.data['server_image']
        if server_image:
            server_image_filename = ''
            if server.server_image:
                server_image_filename = server.server_image
            else:
                server_image_filename = get_unique_filename(server_image.get('filename'))
            
            uploadServerImage = upload_file_to_s3(server_image, server_image_filename)
            if 'url' not in uploadServerImage:
                return jsonify(error=uploadServerImage), 400
            server.server_image = uploadServerImage['url']

        banner_image = form.data['banner_image']
        if banner_image:
            banner_image_filename = ''
            if server.banner_image:
                banner_image_filename = server.banner_image
            else:
                banner_image_filename = get_unique_filename(banner_image.get('filename'))
            uploadBannerImage = upload_file_to_s3(banner_image, banner_image_filename)
            if 'url' not in uploadBannerImage:
                return jsonify(error=uploadBannerImage), 400
            server.banner_image = uploadBannerImage['url']
        print('put2', server.name, server.description)
        try:
            db.session.commit()
            return jsonify(message="Server updated successfully"), 200
        except Exception as e:
            # Handle any errors that might occur during the update process
            db.session.rollback()
            return jsonify(error="An error occurred while updating the server"), 500

        return server.to_dict()
    print (form.errors)
    return {"error": "An unknown error has occcured in the PUT method of server_routes.py"} 
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

@login_required
@server_routes.route('/<int:serverId>', methods=['GET'])
def get_single_server(serverId):
  server = Server.query.get(serverId)

  if server is None:
        return jsonify({'message': "Server doesn't exist"}), 404

  return jsonify(server.to_dict()), 200

@login_required
@server_routes.route('/all', methods=['GET'])
def get_all_servers():
 servers = Server.query.all()
 server_list = [server.to_dict() for server in servers]
 return jsonify(server_list), 200
