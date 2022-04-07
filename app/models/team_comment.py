from .db import db

class Team_Comment(db.Model):
    __tablename__ = 'team_comments'
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id', ondelete='CASCADE'))
    created_at = db.Column(db.DateTime)
    
    team = db.relationship('Team', back_populates='team_comments')
    user = db.relationship('User', back_populates='team_comments')
    
    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'team_id': self.team_id,
            'created_at': self.created_at,
            'user_username': self.user.username,
        }