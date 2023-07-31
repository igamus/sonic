from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text

def seed_messages():
    for message in [
        { # 1
            "channel_id": 1,
            "owner_id": 1,
            "text": "first"
        },
        { # 2
            "channel_id": 1,
            "owner_id": 2,
            "text": "second"
        },
        { # 3
            "channel_id": 4,
            "owner_id": 3,
            "text": "REY!!!"
        },
        { # 4
            "channel_id": 4,
            "owner_id": 3,
            "text": "REY!!!"
        },
        { # 5
            "channel_id": 4,
            "owner_id": 3,
            "text": "REY!!!"
        },
        { # 6
            "channel_id": 4,
            "owner_id": 3,
            "text": "REY!!!"
        },
        { # 7
            "channel_id": 5,
            "owner_id": 2,
            "text": "Hello!"
        },
        { # 8
            "channel_id": 5,
            "owner_id": 4,
            "text": "Utto nye usabia atoonyoba?"
        },
        { # 9
            "channel_id": 5,
            "owner_id": 4,
            "text": "Ya e'um pukay."
        },
        { # 10
            "channel_id": 5,
            "owner_id": 2,
            "text": "what?"
        },
        { # 11
            "channel_id": 5,
            "owner_id": 4,
            "text": "Yanna kuzu peekay."
        },
        { # 12
            "channel_id": 5,
            "owner_id": 2,
            "text": "Can we talk about star wars?"
        },
        { # 13
            "channel_id": 5,
            "owner_id": 2,
            "text": "Yukusu kenza keena"
        },
        { # 14
            "channel_id": 5,
            "owner_id": 2,
            "text": "I DONT UNDERSTAND"
        },
        { # 15
            "channel_id": 5,
            "owner_id": 2,
            "text": "Ikee nyeta go cona"
        },
        { # 16
            "channel_id": 6,
            "owner_id": 2,
            "text": "All of this has happened before and all of this will happen again"
        },
        { # 17
            "channel_id": 6,
            "owner_id": 2,
            "text": "There are many copies, and they have a plan"
        },
        { # 18
            "channel_id": 6,
            "owner_id": 1,
            "text": "Oh, frack off"
        },
        { # 19
            "channel_id": 6,
            "owner_id": 2,
            "text": "srry"
        },
        { # 20
            "channel_id": 7,
            "owner_id": 5,
            "text": "There’s a reason you separate military and the police. One fights the enemies of the state, the other serves and protects the people. When the military becomes both, then the enemies of the state tend to become the people."
        },
        { # 21
            "channel_id": 7,
            "owner_id": 5,
            "text": "Though in war, you can only get killed once. In politics, it can happen over and over."
        },
        { # 22
            "channel_id": 8,
            "owner_id": 1,
            "text": "hehe, minecraft"
        },
        { # 23
            "channel_id": 9,
            "owner_id": 2,
            "text": "no creepin'"
        },
        { # 24
            "channel_id": 11,
            "owner_id": 6,
            "text": "Make it so"
        },
        { # 25
            "channel_id": 11,
            "owner_id": 8,
            "text": "I'm a doctor, not a bricklayer!"
        },
        { # 26
            "channel_id": 11,
            "owner_id": 3,
            "text": "REY"
        },
        { # 27
            "channel_id": 11,
            "owner_id": 7,
            "text": "Live long and prosper"
        },
        { # 28
            "channel_id": 11,
            "owner_id": 9,
            "text": "I am not a merry man"
        },
        { # 29
            "channel_id": 11,
            "owner_id": 6,
            "text": "Tea. Earl Grey. Hot."
        },
        { # 30
            "channel_id": 11,
            "owner_id": 6,
            "text": "It is possible to commit no mistakes and still lose. That is not a weakness. That is life."
        },
        { # 31
            "channel_id": 10,
            "owner_id": 10,
            "text": "Computer, erase that entire personal log"
        },
        { # 32
            "channel_id": 11,
            "owner_id": 11,
            "text": "DID YOU GUYS FEEL THAT?"
        },
        { # 33
            "channel_id": 12,
            "owner_id": 11,
            "text": "WHY AREN'T YOU ALL ON SOCIAL MEDIA?"
        },
        { # 34
            "channel_id": 12,
            "owner_id": 12,
            "text": "Hey, P"
        },
        { # 35
            "channel_id": 12,
            "owner_id": 11,
            "text": "K!!!"
        },
        { # 36
            "channel_id": 12,
            "owner_id": 13,
            "text": "Discretion, you two."
        },
        { # 37
            "channel_id": 12,
            "owner_id": 11,
            "text": "Sorry, Mr. Fury"
        },
        { # 38
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
