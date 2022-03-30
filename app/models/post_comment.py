from .db import db

class Post_Comment(db.Model):
    __tablename__ = 'post_comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeinKey('posts.id'))
    created_at = db.Column(db.DateTime)
    
    user = db.relationship('User', back_populates='post_comments')
    post = db.relationship('Post', back_populates='post_comments')