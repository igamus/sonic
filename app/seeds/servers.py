from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text
from .users import marnie, bobbie, finn, jawa, rico, picard, spock, mccoy, worf, sisko, spiderman, msmarvel, unknown, demo1, demo2, neon ,bananaguy, npcguy, tracer, dva, ghost, jett, oscar, joe, issac, luffy, zoro, johnathan, felix, bart, batman

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
        # 6
         {
            "owner_id" : 16,
            "public" : True,
            "description" : "The unoffical Valorant Sonic server, not in collaboration with Riot Games. Find the latest news, updates, and memes here!",
            "name" : "Valorant",
            "server_image" : "http://sonic-aws.s3.amazonaws.com/1fed4d1a991440ccbf8ca4e642629afa.png",
            "banner_image" : "http://sonic-aws.s3.amazonaws.com/c043b2bafba443e7b976ab81131d5d65.png",
            "server_memberships": [neon, bananaguy, jett]
        },
          {
            "owner_id" : 17,
            "public" : True,
            "description" : "The unoffical Fortnite Sonic server, not in collaboration with Epic Games. Find the latest news, updates, and memes here!",
            "name" : "Fortnite",
            "server_image" : "http://sonic-aws.s3.amazonaws.com/1fed4d1a991440ccbf8ca4e642629afa.png",
            "banner_image" : "http://sonic-aws.s3.amazonaws.com/c043b2bafba443e7b976ab81131d5d65.png",
            "server_memberships": [bananaguy]
        },
         {
            "owner_id" : 18,
            "public" : True,
            "description" : "Ask questions, join events, win prizes, and meet new friends on the unofficial Terraria server!",
            "name" : "Terraria",
            "server_image" : "http://sonic-aws.s3.amazonaws.com/1fed4d1a991440ccbf8ca4e642629afa.png",
            "banner_image" : "http://sonic-aws.s3.amazonaws.com/c043b2bafba443e7b976ab81131d5d65.png",
            "server_memberships": [npcguy]
        },
         {
            "owner_id" : 19,
            "public" : True,
            "description" : "The largest community-run Overwatch 2 Sonic server. Join us for gameplay discussion, LFG, Overwatch news and more!",
            "name" : "Overwatch",
            "server_image" : "http://sonic-aws.s3.amazonaws.com/1fed4d1a991440ccbf8ca4e642629afa.png",
            "banner_image" : "http://sonic-aws.s3.amazonaws.com/c043b2bafba443e7b976ab81131d5d65.png",
            "server_memberships": [tracer, dva]
        },

        {
            "owner_id" : 21,
            "public" : True,
            "description" : "Offical Sonic:Phasmophobia is a 4 player online co-op psychological horror.",
            "name" : "Phasmophobia",
            "server_image" : "http://sonic-aws.s3.amazonaws.com/1fed4d1a991440ccbf8ca4e642629afa.png",
            "banner_image" : "http://sonic-aws.s3.amazonaws.com/c043b2bafba443e7b976ab81131d5d65.png",
            "server_memberships": [ghost]
        },

        # 11
        {
            "owner_id" : 23,
            "public" : True,
            "description" : "Welcome to the friendly community of coders. This is a place to learn trolls will be removed",
            "name" : "OneHundredDevs",
            "server_image" : "http://sonic-aws.s3.amazonaws.com/1fed4d1a991440ccbf8ca4e642629afa.png",
            "banner_image" : "http://sonic-aws.s3.amazonaws.com/c043b2bafba443e7b976ab81131d5d65.png",
            "server_memberships": [oscar]
        },
        {
            "owner_id" : 23,
            "public" : True,
            "description" : "A utopia of ecstatic english leaning and a host of amicable enthusiasts and natives to practice with.",
            "name" : "The English Hub",
            "server_image" : "http://sonic-aws.s3.amazonaws.com/1fed4d1a991440ccbf8ca4e642629afa.png",
            "banner_image" : "http://sonic-aws.s3.amazonaws.com/c043b2bafba443e7b976ab81131d5d65.png",
            "server_memberships": [oscar, issac]
        },
        {
            "owner_id" : 26,
            "public" : True,
            "description" : "This server will leave you searching for a long time.",
            "name" : "The One piece",
            "server_image" : "http://sonic-aws.s3.amazonaws.com/1fed4d1a991440ccbf8ca4e642629afa.png",
            "banner_image" : "http://sonic-aws.s3.amazonaws.com/c043b2bafba443e7b976ab81131d5d65.png",
            "server_memberships": [oscar, issac]
        },
        {
            "owner_id" : 28,
            "public" : True,
            "description" : "This is a fan server all about the popular anime series JoJo's Bizarre Adventure.",
            "name" : "Jojo Bizarre Adventure ",
            "server_image" : "http://sonic-aws.s3.amazonaws.com/1fed4d1a991440ccbf8ca4e642629afa.png",
            "banner_image" : "http://sonic-aws.s3.amazonaws.com/c043b2bafba443e7b976ab81131d5d65.png",
            "server_memberships": [johnathan]
        },
        {
            "owner_id" : 29,
            "public" : True,
            "description" : "This is a fan server for the youtuber Felix.",
            "name" : "Pewdiepie Fan Club ",
            "server_image" : "http://sonic-aws.s3.amazonaws.com/1fed4d1a991440ccbf8ca4e642629afa.png",
            "banner_image" : "http://sonic-aws.s3.amazonaws.com/c043b2bafba443e7b976ab81131d5d65.png",
            "server_memberships": [felix]
        },
        # 16
        {
            "owner_id" : 30,
            "public" : True,
            "description" : "This is a Simpson lover sonic server.",
            "name" : "The simpsons ",
            "server_image" : "http://sonic-aws.s3.amazonaws.com/1fed4d1a991440ccbf8ca4e642629afa.png",
            "banner_image" : "http://sonic-aws.s3.amazonaws.com/c043b2bafba443e7b976ab81131d5d65.png",
            "server_memberships": [bart]
        },
        {
            "owner_id" : 31,
            "public" : True,
            "description" : "This battle never stops.",
            "name" : "The Justice League ",
            "server_image" : "http://sonic-aws.s3.amazonaws.com/1fed4d1a991440ccbf8ca4e642629afa.png",
            "banner_image" : "http://sonic-aws.s3.amazonaws.com/c043b2bafba443e7b976ab81131d5d65.png",
            "server_memberships": [batman]
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
