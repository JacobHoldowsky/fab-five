from app.api.auth_routes import login
from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, follow

follow_routes = Blueprint('follows', __name__)

@follow_routes.route('/<int:user_id>/followeds')
@login_required
def user_followeds(user_id):
    user = User.query.get(user_id)
    followeds = user.followed.all()
    return {'user_followeds': [followed.to_dict() for followed in followeds]}

@follow_routes.route('/<int:user_id>/followers')
@login_required
def user_followers(user_id):
    user = User.query.get(user_id)
    followers = user.follower.all()
    return {'user_followers': [follower.to_dict() for follower in followers]}
    