from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
from app.models.post import Post
from app.models.team import Team

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
# @login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/teams')
@login_required
def user_teams(id):
    teams = Team.query.filter(Team.user_id == id).all()
    return {'teams': [team.to_dict() for team in teams]}

@user_routes.route('/<int:id>/posts')
@login_required
def user_posts(id):
    posts = Post.query.filter(Post.user_id == id).all()
    return {'posts': [post.to_dict() for post in posts]}
    
