from .db import db, add_prefix_for_prod, environment, SCHEMA



class Message(db.Model):
    __tablename__ = "messages"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("channels.id")), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    text = db.Column(db.String(500), nullable=False)

    #relationship attributes
    channel = db.relationship("Channel", back_populates="messages")
    reactions = db.relationship("Reaction", back_populates="message", cascade="delete-orphan, all")
    user = db.relationship("User", back_populates="messages")


    def to_dict(self):
        return {
            "id": self.id,
            "channel_id": self.channel_id,
            "owner_id": self.owner_id,
            "text": self.text
        }
