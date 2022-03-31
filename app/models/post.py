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
    
    def to_dict(self):
        return {
            'id': self.id,
            'img_src': self.img_src,
            'caption': self.caption,
            'player_id': self.player_id,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'user_username': self.user.username,
            'player_first_name': self.player.first_name,
            'player_last_name': self.player.last_name,
            'player_position': self.player.position,
            'player_headshot_src': self.player.headshot_src,
            'player_inside_rating': self.player.inside_rating,
            'player_outside_rating': self.player.outside_rating,
            'player_rebound_rating': self.player.rebound_rating,
            'player_defense_rating': self.player.defense_rating,
            'player_hustle_rating': self.player.hustle_rating
        }