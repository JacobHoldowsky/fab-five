from .db import db

players_teams = db.Table(
    'players_teams',
    db.Column("player_id", db.Integer, db.ForeignKey('players.id', ondelete='CASCADE'), primary_key=True),
    db.Column('team_id', db.Integer, db.ForeignKey('teams.id', ondelete='CASCADE'), primary_key=True)
)