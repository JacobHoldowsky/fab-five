from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Team_Comment, team

team_comment_routes = Blueprint('team_comments', __name__)

@team_comment_routes.route('/')
@login_required
def team_comments():
    team_comments = Team_Comment.query.all()
    return {'team_comments': [team_comment.to_dict() for team_comment in team_comments]}

@team_comment_routes.route('/<int:id>')
@login_required
def team_comment(id):
    team_comment = Team_Comment.query.get(id)
    return team_comment.to_dict()