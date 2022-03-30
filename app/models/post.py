from .db import db

class Post(db.Model):
    __tablename__ = 'posts'
    
    id = db.Column(db.Integer, primary_key=True)
    img_src = db.Column(db.Text, nullable=False)
    caption = db.Column(db.String(150), nullable=False)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime)
    
    user = db.relationship('User', back_populates='posts')
    post_comments = db.relationship('Post_Comment', back_populates='post', cascade='all, delete')
    player = db.relationship('Player', back_populates='posts')