from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms.new_team_form import NewTeamForm
from app.models import Team, User, Player, db
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

team_routes = Blueprint('teams', __name__)

@team_routes.route('/')
# @login_required
def followed_teams():
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
    
    if 'logo' not in request.files:
        return {"errors": "logo required"}, 400
    logo_src = request.files['logo']
    
    if not allowed_file(logo_src.filename):
        return {"errors": "file type not permitted"}, 400
    
    logo_src.filename = get_unique_filename(logo_src.filename)
    
    upload = upload_file_to_s3(logo_src)
    
    if "url" not in upload:

        return upload, 400
    
    logo_src = upload['url']

    form['csrf_token'].data = request.cookies['csrf_token']
    city = form.data['city']
    name = form.data['name']
    logo_src = logo_src
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

@team_routes.route('/<int:team_id>/edit', methods=['PUT'])
@login_required
def edit_team(team_id):
    form = NewTeamForm()
    
    # if 'logo' not in request.files:
    #     return {"errors": "logo required"}, 400
    # logo_src = request.files['logo']
    
    # if not allowed_file(logo_src.filename):
    #     return {"errors": "file type not permitted"}, 400
    
    # logo_src.filename = get_unique_filename(logo_src.filename)
    
    # upload = upload_file_to_s3(logo_src)
    
    # if "url" not in upload:

    #     return upload, 400
    
    # logo_src = upload['url']
    
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit:
        city = form.data['city']
        name = form.data['name']
        # logo_src = logo_src
        player_one = Player.query.get(form.data['player_one'])
        player_two = Player.query.get(form.data['player_two'])
        player_three = Player.query.get(form.data['player_three'])
        player_four = Player.query.get(form.data['player_four'])
        player_five = Player.query.get(form.data['player_five'])
        team = Team.query.get(team_id)
        team.city = city
        team.name = name
        # team.logo_src = logo_src
        team.players = [player_one, player_two, player_three, player_four, player_five]
        db.session.commit()
        return team.to_dict()