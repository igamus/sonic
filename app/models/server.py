from .db import db, environment, SCHEMA, add_prefix_for_prod
from .users_servers import memberships


class Server(db.Model):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    public = db.Column(db.Boolean)
    description = db.Column(db.String(255), nullable=False)
    name= db.Column(db.String(255), nullable=False, unique=True)
    server_image = db.Column(db.String(250), nullable=False)
    banner_image = db.Column(db.String(250), nullable=False)

  #relationship attributes
    owner = db.relationship("User", back_populates="server")
    server_memberships = db.relationship(
        "User",
        secondary=memberships,
        back_populates="user_memberships"
    )
    channels = db.relationship("Channel", back_populates="server", cascade="delete-orphan, all")



    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'public': self.public,
            'description': self.description,
            'name': self.name,
            'serverImage': self.server_image,
            'bannerImage': self.banner_image
        }
