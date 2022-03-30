from .db import db

class Team(db.Model):
    __tablename__ = "teams"
    
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    logo_src = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    players = db.relationship('Player')