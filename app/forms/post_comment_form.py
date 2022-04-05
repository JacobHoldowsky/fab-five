from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def comment_too_long(form, field):
    comment = field.data
    if len(comment) > 150:
        raise ValidationError('Comment is too long.')

class PostCommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired(), comment_too_long])
    post_id = IntegerField('post_id', validators=[DataRequired()])