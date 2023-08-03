from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
demo1 = User(
    username='Demo 1', email='demo1@aa.io', password='password', profile_picture='http://sonic-aws.s3.amazonaws.com/53d02c6288504e08bf0ca3be5696ba85.png')
demo2 = User(
    username='Demo 2', email='demo2@aa.io', password='password', profile_picture='http://sonic-aws.s3.amazonaws.com/fb2bf1d54a5040f5ab7cfcac0f26a0bb.png')
marnie = User(
    username='marnie', email='marnie@aa.io', password='password', profile_picture='http://sonic-aws.s3.amazonaws.com/0e97eafd8cad4d9bac24f6a122f31830.png')
bobbie = User(
    username='bobbie', email='bobbie@aa.io', password='password', profile_picture='http://sonic-aws.s3.amazonaws.com/550bd6945ee54238af26f5a632e9af94.png')
finn = User(
    username='finn', email='fn2187@firstorder.gov', password='REY', profile_picture='http://sonic-aws.s3.amazonaws.com/abc552a36e9c432a95ce1088acc8e412.png'
)
jawa = User(
    username='jawa-27', email='j27@jawa.net', password='jawa', profile_picture='http://sonic-aws.s3.amazonaws.com/b3cd45b5f40744b2accd36c3ea4dd827.png'
)
rico = User(
    username='jrico', email='johnnyrico@mobileinfantry.net', password='dizzy', profile_picture='http://sonic-aws.s3.amazonaws.com/b0ab37516970414d9f202225cc8acc03.png'
)
picard = User(
    username='cjlp', email='cjlp@starfleet.gov', password='patrick', profile_picture='https://sonic-aws.s3.us-east-2.amazonaws.com/d9118f9a908d4a72b2059051404c8e92.png'
)
spock = User(
    username='docspock', email='spock@starfleet.gov', password='leonard', profile_picture='http://sonic-aws.s3.amazonaws.com/c105772176c44a1289ac8289faf9bf04.png'
)
mccoy = User(
    username='drmccoy', email='mccoy@starfleet.gov', password='deforest', profile_picture='http://sonic-aws.s3.amazonaws.com/ed247b0df781411f856febe735d70f4c.png'
)
worf = User(
    username='worf', email='worf@starfleet.gov', password='michael', profile_picture='http://sonic-aws.s3.amazonaws.com/4ffb625043de447cb4603e319bb13986.png'
)
sisko = User(
    username='sisko', email='bsisko@starfleet.gov', password='avery', profile_picture='http://sonic-aws.s3.amazonaws.com/53c2b9ae403c47469692687eb013c2f8.png'
)
spiderman = User(
    username='spiderman', email='pparker@avengers.co', password='peterandrewtom', profile_picture='http://sonic-aws.s3.amazonaws.com/f344b22792974b82bfb5da4f38eeee31.png'
)
msmarvel = User(
    username='msmarvel', email='kkhan@captainmarvelfans.blogspot.com', password='iman', profile_picture='http://sonic-aws.s3.amazonaws.com/b2459cbcd882444e8bf22f1858f3a3e7.png'
)
unknown = User(
    username='UNKNOWN', email='unknown@shield.gov', password='guest', profile_picture='http://sonic-aws.s3.amazonaws.com/c1aa63e918f1449e8d5f98cb746364ac.png'
)

def seed_users():
    db.session.add(marnie) # 1
    db.session.add(bobbie) # 2
    db.session.add(finn) # 3
    db.session.add(jawa) # 4
    db.session.add(rico) # 5
    db.session.add(picard) # 6
    db.session.add(spock) # 7
    db.session.add(mccoy) # 8
    db.session.add(worf) # 9
    db.session.add(sisko) # 10
    db.session.add(spiderman) # 11
    db.session.add(msmarvel) # 12
    db.session.add(unknown) # 13
    db.session.add(demo1) # 14
    db.session.add(demo2) # 15
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.memberships RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM memberships"))

    db.session.commit()
