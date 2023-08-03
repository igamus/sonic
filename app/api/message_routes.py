from flask import Blueprint, jsonify, session, request
from app.models import User, Message, db
from flask_login import current_user, login_required

message_routes = Blueprint('message', __name__)

@message_routes.route('/<int:messageId>', methods=["DELETE"])
@login_required
def delete_message(messageId):
    """
    Deletes specified message
    """
    message = Message.query.filter(Message.id == messageId).first()

    db.session.delete(message)
    db.session.commit()

    message = f"Message {messageId} deleted"

    print(message)

    return {"message": message}
