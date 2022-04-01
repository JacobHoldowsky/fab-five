from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Team, User

team_routes = Blueprint('teams', __name__)

@team_routes.route('/<int:user_id>')
@login_required
def followed_teams(user_id):
    user = User.query.get(user_id)
    # teams = user.followed_teams()
    teams = Team.query.all()
    print('TEAMSsssssssssssssafdasdfasdfasd', teams)
    return {'teams': [team.to_dict() for team in teams]}

@team_routes.route('/<int:id>')
@login_required
def team(id):
    team = Team.query.get(id)
    return team.to_dict()