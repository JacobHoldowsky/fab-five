from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Team

team_routes = Blueprint('teams', __name__)

@team_routes.route('/')
@login_required
def teams():
    teams = Team.query.all()
    return {'teams': [team.to_dict() for team in teams]}

@team_routes.route('/<int:id>')
@login_required
def team(id):
    team = Team.query.get(id)
    return team.to_dict()