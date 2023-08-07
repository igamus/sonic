from flask_socketio import SocketIO, emit
import os
from app.models import db, Channel, User, Message, Reaction

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

@socketio.on("delete_message")
def handle_delete_message(data):
    target_message = Message.query.get(data['message_id'])
    db.session.delete(target_message)
    db.session.commit()
    emit("chat", data, broadcast=True)

@socketio.on("react")
def handle_react(data):
    test = db.session.query(Reaction).filter(Reaction.owner_id == data["owner_id"]).filter(Reaction.emoji == data['emoji']).filter(Reaction.message_id == data['message_id']).first()
    if test:
        print("test fail")
        print(test)
        return
    else:
        print("test pass")
        reaction = Reaction(
            owner_id = data['owner_id'],
            message_id = data['message_id'],
            emoji = data['emoji']
        )
        db.session.add(reaction)
        db.session.commit()
        print(reaction)
        emit("react", data, broadcast=True)

@socketio.on("delete_reaction")
def handle_delete_reaction(data):
    print(data["owner_id"])
    print(data['emoji'])
    print(data['message_id'])
    target_reaction = db.session.query(Reaction).filter(Reaction.owner_id == data["owner_id"]).filter(Reaction.emoji == data['emoji']).filter(Reaction.message_id == data['message_id']).first()
    print(target_reaction)
    db.session.delete(target_reaction)
    db.session.commit()
    emit("react", data, broadcast=True)
