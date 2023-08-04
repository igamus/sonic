from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text
from .users import marnie, bobbie, finn, jawa, rico, picard, spock, mccoy, worf, sisko, spiderman, msmarvel, unknown, demo1, demo2

def seed_servers():
    for server in [
        {
            "owner_id" : 1,
            "public" : True,
            "description" : "What could it cost ten dollars",
            "name" : "Go See A Star War",
            "server_image" : "http://sonic-aws.s3.amazonaws.com/1fed4d1a991440ccbf8ca4e642629afa.png",
            "banner_image" : "http://sonic-aws.s3.amazonaws.com/c043b2bafba443e7b976ab81131d5d65.png",
            "server_memberships": [marnie, bobbie, finn, jawa, demo1, demo2]
        },
        {
            "owner_id" : 1,
            "public" : False,
            "description" : "Don't look at the Enderman",
            "name" : "Mine the Craft",
            "server_image" : "http://sonic-aws.s3.amazonaws.com/dd967820e7c24c0c880b49a613fd8678.png",
            "banner_image" : "http://sonic-aws.s3.amazonaws.com/2ed17f23fd1b416a9a43585ca04ca734.png",
            "server_memberships": [marnie, bobbie, demo2]
        },
        {
            "owner_id" : 2,
            "public" : True,
            "description" : "Battlestar Galactica",
            "name" : "Bears, Beets",
            "server_image" : "http://sonic-aws.s3.amazonaws.com/d3f0fe8b1e824c9cbf9130da19fc6f55.png",
            "banner_image" : "http://sonic-aws.s3.amazonaws.com/a7a90e4158244105823d2cdc032d116a.png",
            "server_memberships": [bobbie, marnie, rico, demo1]
        },
        {
            "owner_id" : 6,
            "public" : False,
            "description" : "We just pretend Enterprise doesn't exist",
            "name" : "To Boldly Go",
            "server_image" : "http://sonic-aws.s3.amazonaws.com/f21a2c80245f40ef9c30b41e99e64f25.png",
            "banner_image" : "http://sonic-aws.s3.amazonaws.com/1cc24ac13634400e9b5f956c3eabbb31.png",
            "server_memberships": [picard, mccoy, finn, spock, worf, sisko]
        },
        {
            "owner_id" : 13,
            "public" : True,
            "description" : "Now we're all standing in a circle",
            "name" : "Marvel Guardians",
            "server_image" : "http://sonic-aws.s3.amazonaws.com/b315f8724bb14c9799112e64d8bd3781.png",
            "banner_image" : "http://sonic-aws.s3.amazonaws.com/ded9c36c8ab34672a419a6d8c98a2a7d.png",
            "server_memberships": [spiderman, msmarvel, unknown, marnie]
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
