from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms import TeamCommentForm
from app.models import Team_Comment, db

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

@team_comment_routes.route('/<int:team_id>', methods=['POST'])
@login_required
def create_team_comment(team_id):
    form = TeamCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        content = form.data['content']
        team_comment = Team_Comment(
            content=content,
            user_id=current_user.id,
            team_id=team_id,
            created_at=datetime.now()
        )
        db.session.add(team_comment)
        db.session.commit()
        return team_comment.to_dict()
    if form.errors:
        return form.errors
    
@team_comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_team_comment(comment_id):
    comment = Team_Comment.query.get(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()


@team_comment_routes.route('/<int:comment_id>/edit', methods=['PUT'])
@login_required
def edit_team_comment(comment_id):
    form = TeamCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print('FORM.DATA',form.data)
        content = form.data['content']
        comment = Team_Comment.query.get(comment_id)
        comment.content = content
        db.session.commit()
        return comment.to_dict()