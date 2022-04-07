from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, ValidationError

def comment_too_long(form, field):
    content = field.data
    if len(content) > 255:
        raise ValidationError('Comment is too long.')

class TeamCommentForm(FlaskForm):
    content = TextAreaField('content', validators=[DataRequired(), comment_too_long])
    
