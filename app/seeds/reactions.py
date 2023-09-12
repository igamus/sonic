from app.models import db, Reaction, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reactions():
    for reaction in [
        {
            "owner_id": 12,
            "message_id": 37,
            "emoji": "1F602"
        },
        {
            "owner_id": 12,
            "message_id": 37,
            "emoji": "1F480"
        },
        {
            "owner_id": 13,
            "message_id": 37,
            "emoji": "1F621"
        },
        {
            "owner_id": 11,
            "message_id": 34,
            "emoji": "2764;&#xfe0f"
        },
        {
            "owner_id": 12,
            "message_id": 35,
            "emoji": "2764;&#xfe0f"
        }
    ]:
        db.session.add(Reaction(**reaction))

    db.session.commit()

def undo_reactions():
    if environment=='production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.reactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reactions"))
    db.session.commit()
