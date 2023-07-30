from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo1 = User(
        username='Demo 1', email='demo1@aa.io', password='password', profile_picture='')
    demo2 = User(
        username='Demo 2', email='demo2@aa.io', password='password', profile_picture='')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', profile_picture='')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', profile_picture='')
    finn = User(
        username='finn', email='fn2187@firstorder.gov', password='REY', profile_picture=''
    )
    jawa = User(
        username='jawa-27', email='j27@jawa.net', password='jawa', profile_picture=''
    )
    rico = User(
        username='jrico', email='johnnyrico@mobileinfantry.net', password='dizzy', profile_picture=''
    )
    picard = User(
        username='cjlp', email='cjlp@starfleet.gov', password='patrick', profile_picture=''
    )
    spock = User(
        username='docspock', email='spock@starfleet.gov', password='leonard', profile_picture=''
    )
    mccoy = User(
        username='drmccoy', email='mccoy@starfleet.gov', password='deforest', profile_picture=''
    )
    worf = User(
        username='worf', email='worf@starfleet.gov', password='michael', profile_picture=''
    )
    sisko = User(
        username='sisko', email='bsisko@starfleet.gov', password='avery', profile_picture=''
    )
    spiderman = User(
        username='spiderman', email='pparker@avengers.co', password='peterandrewtom', profile_picture=''
    )
    msmarvel = User(
        username='msmarvel', email='kkhan@captainmarvelfans.blogspot.com', password='iman', profile_picture=''
    )
    unknown = User(
        username='UNKNOWN', email='unknown@shield.gov', password='guest', profile_pic=''
    )


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

    db.session.commit()
