from .db import db

class Team_Comment(db.Model):
    __tablename__ = 'team_comments'
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))
    created_at = db.Column(db.DateTime)
    
    team = db.relationship('Team', back_populates='team_comments')
    user = db.relationship('User', back_populates='team_comments')