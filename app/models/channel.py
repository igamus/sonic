from .db import db



class Channel(db.Model):
    __tablename__ = "channels"
    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey("servers.id") , nullable=False)
    description = db.Column(db.String(255), nullable=False)
    name= db.Column(db.String(255), nullable=False)

    #relationship attributes
    server = db.relationship("Server", back_populates="channels")
    messages = db.relationship("Message", back_populates="channel", cascade="delete-orphan, all")


    def to_dict(self):
        return {
            "id": self.id,
            "server_id": self.server_id,
            "description": self.description,
            "name": self.name
        }
