from app.models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text

def seed_channels():
    for channel in [
        {
            "server_id": 1,
            "description": "Grevious",
            "name": "General"
        },
        {
            "server_id": 1,
            "description": "General Kenobi",
            "name": "Hello There"
        },
        {
            "server_id": 1,
            "description": "And I thought they smelled bad on the outside",
            "name": "Hoth"
        },
        {
            "server_id": 1,
            "description": ":(",
            "name": "Rey"
        },
        {
            "server_id": 1,
            "description": "Utto nye usabia atoonyoba?",
            "name": "Utinni!"
        },
        {
            "server_id": 3,
            "description": "Sometimes you have to roll the hard six",
            "name": "General"
        },
        {
            "server_id": 3,
            "description": "Take your stims",
            "name": "Viper Pilot Lounge"
        },
        {
            "server_id": 2,
            "description": "Git gud",
            "name": "How to beat the Enderdragon"
        },
        {
            "server_id": 2,
            "description": "Punch a tree",
            "name": "General"
        },
        {
            "server_id": 4,
            "description": "Guinan says hello",
            "name": "Ten Forward"
        },
        {
            "server_id": 4,
            "description": "No, Worf, we're not firing torpedoes",
            "name": "General"
        },
        {
            "server_id": 5,
            "description": "Mr. Stark I don't feel so good",
            "name": "The Snappening"
        },
        {
            "server_id": 5,
            "description": "Who is this guy",
            "name": "General"
        },
        {
            "server_id": 5,
            "description": "You have to stay awake, Eglantine, or the Pure Ones will moon-blink us",
            "name": "Guardians of Ga'Hoole"
        },
        {
            "server_id": 6,
            "description": "sage is op",
            "name": "General"
        },
         {
            "server_id": 7,
            "description": "",
            "name": "General"
        },
         {
            "server_id": 8,
            "description": "",
            "name": "General"
        },
         {
            "server_id": 9,
            "description": "",
            "name": "General"
        },
        {
            "server_id": 10,
            "description": "",
            "name": "General"
        },
        {
            "server_id": 11,
            "description": "",
            "name": "General"
        },
        {
            "server_id": 12,
            "description": "",
            "name": "General"
        },
        {
            "server_id": 13,
            "description": "",
            "name": "General"
        },
        {
            "server_id": 14,
            "description": "",
            "name": "General"
        },
        {
            "server_id": 15,
            "description": "",
            "name": "General"
        },
        {
            "server_id": 16,
            "description": "",
            "name": "General"
        },
        {
            "server_id": 17,
            "description": "",
            "name": "General"
        }
    ]:
        db.session.add(Channel(**channel))

    db.session.commit()

def undo_channels():
    if environment=='production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
