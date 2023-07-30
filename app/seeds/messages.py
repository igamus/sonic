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
            "channel_id": 4,
            "owner_id": 3,
            "text": "REY!!!"
        },
        {
            "channel_id": 4,
            "owner_id": 3,
            "text": "REY!!!"
        },
                {
            "channel_id": 4,
            "owner_id": 3,
            "text": "REY!!!"
        },
        {
            "channel_id": 4,
            "owner_id": 3,
            "text": "REY!!!"
        },
        {
            "channel_id": 5,
            "owner_id": 2,
            "text": "Hello!"
        },
        {
            "channel_id": 5,
            "owner_id": 4,
            "text": "Utto nye usabia atoonyoba?"
        },
        {
            "channel_id": 5,
            "owner_id": 4,
            "text": "Ya e'um pukay."
        },
        {
            "channel_id": 5,
            "owner_id": 2,
            "text": "what?"
        },
        {
            "channel_id": 5,
            "owner_id": 4,
            "text": "Yanna kuzu peekay."
        },
        {
            "channel_id": 5,
            "owner_id": 2,
            "text": "Can we talk about star wars?"
        },
        {
            "channel_id": 5,
            "owner_id": 2,
            "text": "Yukusu kenza keena"
        },
        {
            "channel_id": 5,
            "owner_id": 2,
            "text": "I DONT UNDERSTAND"
        },
        {
            "channel_id": 5,
            "owner_id": 2,
            "text": "Ikee nyeta go cona"
        },
        {
            "channel_id": 6,
            "owner_id": 1,
            "text": "All of this has happened before and all of this will happen again"
        },
        {
            "channel_id": 6,
            "owner_id": 1,
            "text": "There are many copies, and they have a plan"
        },
        {
            "channel_id": 6,
            "owner_id": 2,
            "text": "Oh, frack off"
        },
        {
            "channel_id": 6,
            "owner_id": 1,
            "text": "srry"
        },
        {
            "channel_id": 7,
            "owner_id": 5,
            "text": "There’s a reason you separate military and the police. One fights the enemies of the state, the other serves and protects the people. When the military becomes both, then the enemies of the state tend to become the people."
        },
        {
            "channel_id": 7,
            "owner_id": 5,
            "text": "Though in war, you can only get killed once. In politics, it can happen over and over."
        },
        {
            "channel_id": 8,
            "owner_id": 1,
            "text": "hehe, minecraft"
        },
        {
            "channel_id": 9,
            "owner_id": 2,
            "text": "no creepin'"
        },
        {
            "channel_id": 11,
            "owner_id": 6,
            "text": "Make it so"
        },
        {
            "channel_id": 11,
            "owner_id": 8,
            "text": "I'm a doctor, not a bricklayer!"
        },
        {
            "channel_id": 11,
            "owner_id": 3,
            "text": "REY"
        },
        {
            "channel_id": 11,
            "owner_id": 7,
            "text": "Live long and prosper"
        },
        {
            "channel_id": 11,
            "owner_id": 9,
            "text": "I am not a merry man"
        },
        {
            "channel_id": 11,
            "owner_id": 6,
            "text": "Tea. Earl Grey. Hot."
        },
        {
            "channel_id": 11,
            "owner_id": 6,
            "text": "It is possible to commit no mistakes and still lose. That is not a weakness. That is life."
        },
        {
            "channel_id": 10,
            "owner_id": 10,
            "text": "Computer, erase that entire personal log"
        },
        {
            "channel_id": 11,
            "owner_id": 11,
            "text": "DID YOU GUYS FEEL THAT?"
        },
        {
            "channel_id": 12,
            "owner_id": 11,
            "text": "WHY AREN'T YOU ALL ON SOCIAL MEDIA?"
        },
        {
            "channel_id": 12,
            "owner_id": 12,
            "text": "Hey, P"
        },
        {
            "channel_id": 12,
            "owner_id": 11,
            "text": "K!!!"
        },
        {
            "channel_id": 12,
            "owner_id": 13,
            "text": "Discretion, you two."
        },
        {
            "channel_id": 12,
            "owner_id": 11,
            "text": "Sorry, Mr. Fury"
        },
        {
            "channel_id": 13,
            "owner_id": 1,
            "text": "I want to get off the plane!"
        },
        {
            "channel_id": 11,
            "owner_id": 9,
            "text": "That is a joke. I get it… it is not funny, but I get it."
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
