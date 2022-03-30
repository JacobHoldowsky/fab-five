from .db import db
from app.models.players_teams import players_teams


class Team(db.Model):
    __tablename__ = "teams"

    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    logo_src = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    players = db.relationship(
        'Player',
        back_populates='teams',
        secondary=players_teams)

    team_comments = db.relationship('Team_Comment', back_populates='team', cascade='all, delete')
    user = db.relationship('User', back_populates='teams')