from flask import Blueprint, jsonify, session, request
from app.models import User, Channel, db
from flask_login import current_user, login_required
from ..forms.createchannel_form import CreateChannelForm

channel_routes = Blueprint('channel', __name__)

@channel_routes.route('/<int:channelId>/messages')
@login_required
def channel_messages(channelId):
    """
    Returns a list of messages from the specified channel
    """

    channel = Channel.query.filter(Channel.id == channelId).first()

    messageList = []
    for message in channel.messages:
        newMessage = message.to_dict()
        newMessage["user"] = message.user.to_dict()
        messageList.append(newMessage)

    print (messageList)

    return messageList

@channel_routes.route('/<int:channelId>', methods=["DELETE"])
@login_required
def delete_channel(channelId):
    """
    Deletes specified channel
    """
    channel = Channel.query.filter(Channel.id == channelId).first()

    db.session.delete(channel)
    db.session.commit()

    message = f"Channel {channelId} deleted"

    print(message)

    return {"message": message}

@channel_routes.route('/<int:channelId>', methods=["PUT"])
@login_required
def update_channel(channelId):
    """
    Updates the specified channel with payload information
    """
    form = CreateChannelForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        channel = Channel.query.filter(Channel.id == channelId).first()

        if form.data["description"]:
            channel.description = form.data["description"]
        else:
            channel.description = ""
        if form.data["name"]:
            channel.name = form.data["name"]

        db.session.commit()

        updated_channel = channel.to_dict()

        print(updated_channel)

        return updated_channel

    if form.errors:
        return form.errors

    return {"error": "An unknown error has occurred"}
