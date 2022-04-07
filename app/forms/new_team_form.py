from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class NewTeamForm(FlaskForm):
    city = StringField('city', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    logo = StringField('logo', validators=[DataRequired()])
    player_one = IntegerField('player-one', validators=[DataRequired()])
    player_two = IntegerField('player-two', validators=[DataRequired()])
    player_three = IntegerField('player-three', validators=[DataRequired()])
    player_four = IntegerField('player-four', validators=[DataRequired()])
    player_five = IntegerField('player-five', validators=[DataRequired()])