from .db import db
from .players_teams import players_teams


class Team(db.Model):
    __tablename__ = "teams"

    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    logo_src = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    players = db.relationship(
        'Player',
        back_populates='teams',
        secondary=players_teams,
        order_by='Player.overall_rating.desc()',
        cascade='all, delete'
    )

    team_comments = db.relationship('Team_Comment', back_populates='team', cascade='all, delete')
    user = db.relationship('User', back_populates='teams')
    
    def to_dict(self):
        return {
            'id': self.id,
            'city': self.city,
            'name': self.name,
            'logo_src': self.logo_src,
            'created_at': self.created_at,
            'players': [player.to_dict() for player in self.players],
            'user_id': self.user_id,
            'user_username': self.user.username,
            'team_comments': {team_comment.id: team_comment.to_dict() for team_comment in self.team_comments}
        }