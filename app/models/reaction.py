from .db import db


class Emoji(db.Model):
    __tablename__ = "emojis"
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(250), nullable=False)
