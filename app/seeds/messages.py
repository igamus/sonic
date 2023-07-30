from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text

            # "channel_id": ,
            # "owner_id": ,
            # "text": 

def seed_messages():
    for message in [
        {
            "channel_id": 1,
            "owner_id": 1,
            "text": "first"
        },
        {
            "channel_id": 1,
            "owner_id": 2,
            "text": "second"
        },
        {
            "channel_id": 0,
            "owner_id": 0,
            "text": ""
        },
        {
            "channel_id": 0,
            "owner_id": 0,
            "text": ""
        },
        {
            "channel_id": 0,
            "owner_id": 0,
            "text": ""
        },
        {
            "channel_id": 0,
            "owner_id": 0,
            "text": ""
        },
        {
            "channel_id": 0,
            "owner_id": 0,
            "text": ""
        },
        {
            "channel_id": 0,
            "owner_id": 0,
            "text": ""
        },
        {
            "channel_id": 0,
            "owner_id": 0,
            "text": ""
        },
        {
            "channel_id": 0,
            "owner_id": 0,
            "text": ""
        },
        {
            "channel_id": 0,
            "owner_id": 0,
            "text": ""
        },
        {
            "channel_id": 0,
            "owner_id": 0,
            "text": ""
        },
        {
            "channel_id": 0,
            "owner_id": 0,
            "text": ""
        },
        {
            "channel_id": 0,
            "owner_id": 0,
            "text": ""
        },
        {
            "channel_id": 0,
            "owner_id": 0,
            "text": ""
        },
        {
            "channel_id": 0,
            "owner_id": 0,
            "text": ""
        }
    ]:
        db.session.add(Message(**message))

    db.session.commit()

    def undo_messages():
        if environment=='production':
            db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
        else:
            db.session.execute(text("DELETE FROM messages"))
        
    db.session.commit()