from flask_wtf import FlaskForm
from wtforms import StringField, FieldList
from wtforms.validators import DataRequired, ValidationError

class NewTeamForm(FlaskForm):
    city = StringField('city', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    logo = StringField('logo', validators=[DataRequired()])
    player1 = FieldList('players', validators=[DataRequired()])