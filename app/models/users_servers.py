from .db import db,environment, SCHEMA
users_servers = db.table(
    'users_servers',
    db.Model.metadata,
db.Column('users', db.Integer, db.ForeignKey('users.id'), primary_key=True ),
db.Column('servers', db.Integer, db.ForeignKey('servers.id'), primary_key=True )
)

if environment == "production":
    likes.schema = SCHEMA
