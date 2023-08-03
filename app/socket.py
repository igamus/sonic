from flask_socketio import SocketIO, emit
import os
from app.models import db, Channel, User, Message

if os.environ.get("FLASK_ENV") == "production":
    origins = ["https://szonic.onrender.com"]
else:
    origins = '*'

socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on("chat")
def handle_chat(data):
    message = Message(
        text = data['text'],
        owner_id = data['owner_id'],
        channel_id = data['channel_id']
    )
    db.session.add(message)
    db.session.commit()
    emit("chat", data, broadcast=True) # data was temp

# @socketio.on("react")
# def handle_react(data):
#     reaction = Reaction(
#         owner_id = data['owner_id']
#         message_id = data['message_id']
#         emoji = data['emoji']
#     )
#     db.session.add(reaction)
#     db.session.commit()
#     emit("react", data, broadcast=True)
