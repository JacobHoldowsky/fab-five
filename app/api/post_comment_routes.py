from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Post_Comment

post_comment_routes = Blueprint('post_comments', __name__)

@post_comment_routes.route('/')
@login_required
def post_comments():
    post_comments = Post_Comment.query.all()
    return {'post_comments': [post_comment.to_dict() for post_comment in post_comments]}

@post_comment_routes.route('/<int:id>')
@login_required
def post_comment(id):
    post_comment = Post_Comment.query.get(id)
    return post_comment.to_dict()