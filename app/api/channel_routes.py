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
        messageList.append(message.to_dict())
    
    print (messageList)

    return messageList