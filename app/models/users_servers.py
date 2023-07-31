from .db import db,environment, SCHEMA


memberships = db.Table(
    'memberships',
    db.Model.metadata,
    db.Column('users', db.Integer, db.ForeignKey('users.id'), primary_key=True ),
    db.Column('servers', db.Integer, db.ForeignKey('servers.id'), primary_key=True )
)

if environment == "production":
    memberships.schema = SCHEMA
