from .db import db



class Message(db.Model):
    __tablename__ = "messages"
    id = db.Column(db.Integer, primary_key=True)
    channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    text = db.Column(db.String(500), nullable=False)

    #relationship attributes
    channel = db.relationship("Channel", back_populates="messages")



    def to_dict(self):
        return {
            "id": self.id,
            "channel_id": self.channel_id,
            "owner_id": self.owner_id,
            "text": self.text
        }
