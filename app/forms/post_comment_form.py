from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired

# def comment_too_long(form, field):
#     content = field.data
#     if len(content) > 150:
#         raise ValidationError('Comment is too long.')

class PostCommentForm(FlaskForm):
    content = TextAreaField('content', validators=[DataRequired()])