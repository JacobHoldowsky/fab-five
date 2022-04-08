from crypt import methods
from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import PostCommentForm
from app.models import Post_Comment, db

post_comment_routes = Blueprint('post_comments', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@post_comment_routes.route('/')
@login_required
def post_comments():
    post_comments = Post_Comment.query.all()
    return {'post_comments': [post_comment.to_dict() for post_comment in post_comments]}

@post_comment_routes.route('/<int:id>')
@login_required
def post_comment(id):
    get_post_comment = Post_Comment.query.get(id)
    return post_comment.to_dict()

@post_comment_routes.route('/<int:post_id>', methods=['POST'])
@login_required
def create_post_comment(post_id):
    form = PostCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        content=form.data['content']
        post_comment = Post_Comment(
            content=content,
            user_id=current_user.id,
            post_id=post_id,
            created_at=datetime.now()
        )
        db.session.add(post_comment)
        db.session.commit()
        return post_comment.to_dict()
    if form.errors:
        return form.errors
    
@post_comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_post_comment(comment_id):
    comment = Post_Comment.query.get(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()