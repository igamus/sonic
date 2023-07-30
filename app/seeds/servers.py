from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text

# id 
# owner_id 
# public 
# description 
# name
# server_image 
# banner_image

def seed_servers():
    for server in [
        {
            "owner_id" : 1,
            "public" : True,
            "description" : "What could it cost ten dollars",
            "name" : "Go See A Star War",
            "server_image" : "",
            "banner_image" : ""
        },
        {
            "owner_id" : 1,
            "public" : False,
            "description" : "Don't look at the Enderman",
            "name" : "Mine the Craft",
            "server_image" : "",
            "banner_image" : ""
        },
        {
            "owner_id" : 2,
            "public" : True,
            "description" : "Battlestar Galactica",
            "name" : "Bears, Beets",
            "server_image" : "",
            "banner_image" : ""
        },
        {
            "owner_id" : 3,
            "public" : False,
            "description" : "We just pretend Enterprise doesn't exist",
            "name" : "To Boldly Go",
            "server_image" : "",
            "banner_image" : ""
        },
        {
            "owner_id" : 3,
            "public" : True,
            "description" : "Now we're all standing in a circle",
            "name" : "Marvel Guardians",
            "server_image" : "",
            "banner_image" : ""
        }, 
    ]:
        db.session.add(Server(**server))

    db.session.commit()

    def undo_servers():
        if environment=='production':
            db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
        else:
            db.session.execute(text("DELETE FROM servers"))
        
    db.session.commit()