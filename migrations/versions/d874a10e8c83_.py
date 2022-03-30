"""empty message

Revision ID: d874a10e8c83
Revises: 
Create Date: 2022-03-30 19:07:46.757451

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd874a10e8c83'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('players',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=50), nullable=False),
    sa.Column('last_name', sa.String(length=50), nullable=False),
    sa.Column('position', sa.String(length=2), nullable=False),
    sa.Column('headshot_src', sa.Text(), nullable=False),
    sa.Column('inside_rating', sa.Integer(), nullable=False),
    sa.Column('outside_rating', sa.Integer(), nullable=False),
    sa.Column('rebound_rating', sa.Integer(), nullable=False),
    sa.Column('defense_rating', sa.Integer(), nullable=False),
    sa.Column('hustle_rating', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('follow',
    sa.Column('followed_id', sa.Integer(), nullable=False),
    sa.Column('follower_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['followed_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('followed_id', 'follower_id')
    )
    op.create_table('posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('img_src', sa.Text(), nullable=False),
    sa.Column('caption', sa.String(length=150), nullable=False),
    sa.Column('player_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['player_id'], ['players.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('teams',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('city', sa.String(length=50), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('logo_src', sa.Text(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('players_teams',
    sa.Column('player_id', sa.Integer(), nullable=False),
    sa.Column('team_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['player_id'], ['players.id'], ),
    sa.ForeignKeyConstraint(['team_id'], ['teams.id'], ),
    sa.PrimaryKeyConstraint('player_id', 'team_id')
    )
    op.create_table('post_comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('post_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('team_comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('team_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['team_id'], ['teams.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('team_comments')
    op.drop_table('post_comments')
    op.drop_table('players_teams')
    op.drop_table('teams')
    op.drop_table('posts')
    op.drop_table('follow')
    op.drop_table('users')
    op.drop_table('players')
    # ### end Alembic commands ###
