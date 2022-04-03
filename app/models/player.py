from .db import db
from .players_teams import players_teams


class Player(db.Model):
    __tablename__ = 'players'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    position = db.Column(db.String(2), nullable=False)
    headshot_src = db.Column(db.Text, nullable=False)
    inside_rating = db.Column(db.Integer, nullable=False)
    outside_rating = db.Column(db.Integer, nullable=False)
    rebound_rating = db.Column(db.Integer, nullable=False)
    defense_rating = db.Column(db.Integer, nullable=False)
    hustle_rating = db.Column(db.Integer, nullable=False)
    passing_rating = db.Column(db.Integer, nullable=False)
    overall_rating = db.Column(db.Integer, nullable=False)

    teams = db.relationship(
        'Team',
        back_populates='players',
        secondary=players_teams)
    posts = db.relationship('Post', back_populates='player')
    
    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'position': self.position,
            'headshot_src': self.headshot_src,
            'inside_rating': self.inside_rating,
            'outside_rating': self.outside_rating,
            'rebound_rating': self.rebound_rating,
            'defense_rating': self.defense_rating,
            'hustle_rating': self.hustle_rating,
            'overall_rating': self.overall_rating,
            'posts': [post.to_dict() for post in self.posts]
        }
