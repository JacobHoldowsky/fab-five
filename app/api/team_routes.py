from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms.new_team_form import NewTeamForm
from app.models import Team, User, Player, db

team_routes = Blueprint('teams', __name__)

@team_routes.route('/')
@login_required
def followed_teams():
    user = User.query.get(current_user.id)
    # teams = user.followed_teams()
    teams = Team.query.all()
    return {'teams': [team.to_dict() for team in teams]}

@team_routes.route('/<int:id>')
@login_required
def team(id):
    team = Team.query.get(id)
    return team.to_dict()

@team_routes.route('/', methods=['POST'])
def create_team():
    form = NewTeamForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        city = form.data['city']
        name = form.data['name']
        logo_src = form.data['logo']
        player_one = Player.query.get(form.data['player_one'])
        player_two = Player.query.get(form.data['player_two'])
        player_three = Player.query.get(form.data['player_three'])
        player_four = Player.query.get(form.data['player_four'])
        player_five = Player.query.get(form.data['player_five'])
        
        team = Team(
            city=city,
            name=name,
            logo_src=logo_src,
            players=[player_one, player_two, player_three, player_four, player_five],
            created_at=datetime.now(),
            user_id=current_user.id
        )
        db.session.add(team)
        db.session.commit()
        return team.to_dict()
    if form.errors:
        return form.errors
    
@team_routes.route('/<int:team_id>', methods=['DELETE'])
@login_required
def delete_team(team_id):
    team = Team.query.get(team_id)
    db.session.delete(team)
    db.session.commit()
    return team.to_dict()