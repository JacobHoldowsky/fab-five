from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms.new_post_form import NewPostForm
from app.models import Post, db

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
@login_required
def posts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}

@post_routes.route('/<int:id>')
@login_required
def post(id):
    post = Post.query.get(id)
    return post.to_dict()

@post_routes.route('/', methods=['POST'])
def create_post():
    form = NewPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        image=form.data['image']
        caption=form.data['caption']
        player=form.data['player']
        
        post = Post(
            img_src=image,
            caption=caption,
            player_id=player,
            user_id = current_user.id,
            created_at=datetime.now()
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    if form.errors:
        return form.errors
    
@post_routes.route('/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    post = Post.query.get(post_id)
    db.session.delete(post)
    db.session.commit()
    return post.to_dict()

@post_routes.route('/<int:post_id>/edit', methods=['PUT'])
@login_required
def edit_post(post_id):
    form = NewPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        image = form.data['image']
        caption = form.data['caption']
        player = form.data['player']
        post = Post.query.get(post_id)
        post.img_src = image
        post.caption = caption
        post.player_id = player
        post.user_id = current_user.id
        db.session.commit()
        return post.to_dict()