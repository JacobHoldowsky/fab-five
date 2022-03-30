import profile
from .db import db


class Player(db.Model):
    __tablename__ = 'players'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    positon = db.Column(db.String(2), nullable=False),
    headshot_src = db.Column(db.text, nullable=False)
    inside_rating = db.Column(db.Integer, nullable=False)
    outside_rating = db.Column(db.Integer, nullable=False)
    rebound_rating = db.Column(db.Integer, nullable=False)
    defense_rating = db.Column(db.Integer, nullable=False)
    hustle_rating = db.Column(db.Integer, nullable=False)
