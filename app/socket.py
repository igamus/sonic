from flask_socketio import SocketIO, emit
import os
from app.models import db, Channel, User, Message

if os.environ.get("FLASK_ENV") == "production":
    origins = ["https://szonic.onrender.com"]
else:
    origins = '*'

socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on("chat")
def handling_channel_messages(data):
    message = Message(
        text = data['text'],
        owner_id = data['owner_id'],
        channel_id = data['channel_id']
    )

    db.session.add(message)
    db.session.commit()
    temp = message.to_dict()
    emit("chat", temp, broadcast=True)
