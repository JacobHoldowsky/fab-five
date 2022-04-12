from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class NewPostForm(FlaskForm):
    image = StringField('image', validators=[DataRequired()])
    caption = StringField('caption', validators=[DataRequired()])
    player = IntegerField('player', validators=[DataRequired()])