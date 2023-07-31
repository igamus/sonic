from .db import db, environment, SCHEMA, add_prefix_for_prod



class Reaction(db.Model):
    __tablename__ = 'reactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    message_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("messages.id")), nullable=False)
    emoji = db.Column(db.String, nullable=False)

  #relationship attributes
    user = db.relationship("User", back_populates="reactions")
    message = db.relationship("Message", back_populates="reactions")



    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'messagesId': self.message_id,
            'emoji': self.emoji
        }
