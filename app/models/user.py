from .db import db
from .follow import follow
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app.models.team import Team


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    teams = db.relationship(
        'Team', back_populates='user', cascade='all, delete')
    team_comments = db.relationship(
        'Team_Comment', back_populates='user', cascade='all, delete')
    posts = db.relationship(
        'Post', back_populates='user', cascade='all, delete')
    post_comments = db.relationship(
        'Post_Comment', back_populates='user', cascade='all, delete')

    followed = db.relationship(
        'User',
        secondary=follow,
        primaryjoin=(follow.c.follower_id == id),
        secondaryjoin=(follow.c.followed_id == id),
        backref=db.backref('followers', lazy='dynamic'), lazy='dynamic'
    )
    
    follower = db.relationship(
        'User',
        secondary=follow,
        primaryjoin=(follow.c.followed_id == id),
        secondaryjoin=(follow.c.follower_id == id),
        backref=db.backref('followeds', lazy='dynamic'), lazy='dynamic'
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

    def follow(self, user):
        if not self.is_following(user):
            self.followed.append(user)

    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)

    def is_following(self, user):
        return self.followed.filter(follow.c.followed_id == user.id).count() > 0

    def followed_teams(self):
        followed = Team.query.join(follow, (follow.c.followed_id == Team.user_id)).filter(
            follow.c.follower_id == self.id
        )
        own = Team.query.filter_by(user_id=self.id)
        return followed.union(own).order_by(Team.created_at.desc())
