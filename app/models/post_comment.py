from .db import db

class Post_Comment(db.Model):
    __tablename__ = 'post_comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    created_at = db.Column(db.DateTime)
    
    user = db.relationship('User', back_populates='post_comments')
    post = db.relationship('Post', back_populates='post_comments')
    
    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'created_at': self.created_at,
            'user_username': self.user.username,
        }