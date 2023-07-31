from .db import db, environment, SCHEMA, add_prefix_for_prod
from .users_servers import memberships
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_picture = db.Column(db.String(250), nullable=False)
    # make sure you add a default url later when user doesn't submit a photo

    servers = db.relationship("Server", back_populates="user", cascade="delete-orphan, all")
    user_memberships = db.relationship(
        "Server",
        secondary=memberships,
        back_populates="server_memberships"
    )
    reactions= db.relationship("Reaction", back_populates="user", cascade="delete-orphan, all")
    messages = db.relationship("Message", back_populates="user", cascade="delete-orphan, all")

    def __repr__(self):
        return f"< User: {self.username} ID: {self.id}>"

    def __str__(self):
        return f"< User: {self.username} ID: {self.id}>"

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profilePic': self.profile_picture
        }
