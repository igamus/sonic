from flask import Blueprint, jsonify, session, request
from app.models import User, Channel, db
from flask_login import current_user, login_required

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
