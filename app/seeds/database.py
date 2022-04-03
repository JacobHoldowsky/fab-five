from datetime import datetime
from turtle import position
from app.models import db, Team, Post, Player, Post_Comment, Team_Comment


def seed_database():
    """
    Players
    """
    james = Player(first_name='Lebron',
                   last_name='James',
                   position='SF',
                   headshot_src='https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png',
                   inside_rating=98,
                   outside_rating=83,
                   rebound_rating=98,
                   defense_rating=94,
                   hustle_rating=98,
                   passing_rating=98,
                   overall_rating=(98*.2+83*.15+98*.2+94*.2+98*.1+98*.15)/1
                   )

    lillard = Player(first_name='Damian',
                  last_name='Lillard',
                  position='PG',
                  headshot_src='https://cdn.nba.com/headshots/nba/latest/1040x760/203081.png',
                  inside_rating=96,
                  outside_rating=87,
                  rebound_rating=82,
                  defense_rating=91,
                  hustle_rating=96,
                  passing_rating=95,
                  overall_rating=(96*.15+90*.15+82*.1+94*.2+96*.15+97*.25)/1
                  )

    wade = Player(first_name='Dwyane',
                  last_name='Wade',
                  position='SG',
                  headshot_src='https://cdn.nba.com/headshots/nba/latest/1040x760/2548.png',
                  inside_rating=96,
                  outside_rating=78,
                  rebound_rating=84,
                  defense_rating=93,
                  hustle_rating=95,
                  passing_rating=87,
                  overall_rating=(96*.2+78*.2+84*.2+93*.15+95*.1+87*.15)/1
                  )

    davis = Player(first_name='Anthony',
                    last_name='Davis',
                    position='C',
                    headshot_src='https://cdn.nba.com/headshots/nba/latest/1040x760/203076.png',
                    inside_rating=94,
                    outside_rating=82,
                    rebound_rating=95,
                    defense_rating=97,
                    hustle_rating=95,
                    passing_rating=92,
                    overall_rating=(94*.3+82*.05+95*.25+97*.25+95*.1+92*.05)/1
                    )

    howard = Player(first_name='Dwight',
                    last_name='Howard',
                    position='C',
                    headshot_src='https://cdn.nba.com/headshots/nba/latest/1040x760/2730.png',
                    inside_rating=88,
                    outside_rating=54,
                    rebound_rating=88,
                    defense_rating=86,
                    hustle_rating=84,
                    passing_rating=74,
                    overall_rating=(88*.3+54*.05+88*.25+86*.25+84*.1+74*.05)/1
                    )

    paul = Player(first_name='Chris',
                  last_name='Paul',
                  position='PG',
                  headshot_src='https://cdn.nba.com/headshots/nba/latest/1040x760/101108.png',
                  inside_rating=96,
                  outside_rating=88,
                  rebound_rating=78,
                  defense_rating=93,
                  hustle_rating=97,
                  passing_rating=98,
                  overall_rating=(96*.15+88*.15+78*.1+93*.2+97*.15+98*.25)/1
                  )

    bryant = Player(first_name='Kobe',
                    last_name='Bryant',
                    position='SG',
                    headshot_src='https://cdn.nba.com/headshots/nba/latest/1040x760/977.png',
                    inside_rating=97,
                    outside_rating=87,
                    rebound_rating=86,
                    defense_rating=93,
                    hustle_rating=99,
                    passing_rating=92,
                    overall_rating=(97*.2+84*.2+81*.2+90*.15+98*.1+92*.15)/1
                    )

    anthony = Player(first_name='Carmelo',
                     last_name='Anthony',
                     position='SF',
                     headshot_src='https://cdn.nba.com/headshots/nba/latest/1040x760/2546.png',
                     inside_rating=94,
                     outside_rating=86,
                     rebound_rating=86,
                     defense_rating=82,
                     hustle_rating=88,
                     passing_rating=86,
                     overall_rating=(94*.2+86*.15+86*.2+82*.2+88*.1+86*.15)/1
                     )

    antetokounmpo = Player(first_name='Giannis',
                     last_name='Antetokounmpo',
                     position='PF',
                     headshot_src='https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png',
                     inside_rating=97,
                     outside_rating=80,
                     rebound_rating=97,
                     defense_rating=98,
                     hustle_rating=97,
                     passing_rating=88,
                     overall_rating=(97*.25+80*.1+97*.2+98*.25+97*.1+88*.1)/1
                     )

    garnett = Player(first_name='Kevin',
                   last_name="Garnett",
                   position='PF',
                   headshot_src='https://cdn.nba.com/headshots/nba/latest/1040x760/708.png',
                   inside_rating=95,
                   outside_rating=70,
                   rebound_rating=96,
                   defense_rating=97,
                   hustle_rating=97,
                   passing_rating=84,
                   overall_rating=(95*.25+70*.1+96*.2+97*.25+97*.1+84*.1)/1
                   )

    db.session.add(james)
    db.session.add(lillard)
    db.session.add(wade)
    db.session.add(davis)
    db.session.add(garnett)
    db.session.add(paul)
    db.session.add(bryant)
    db.session.add(anthony)
    db.session.add(antetokounmpo)
    db.session.add(howard)

    """
    TEAMS
    """
    bulls = Team(city='Chicago',
                 name='Bulls',
                 logo_src='https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg',
                 players=[lillard, wade, james, garnett, davis],
                 user_id=1
                 )

    lakers = Team(city='Los Angeles',
                  name='Lakers',
                  logo_src='https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg',
                  players=[paul, bryant, anthony, antetokounmpo, howard],
                  user_id=2
                  )

    nets = Team(city='Brooklyn',
                name='Nets',
                logo_src='https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg',
                players=[lillard, bryant, anthony, garnett, davis],
                user_id=3
                )

    db.session.add(bulls)
    db.session.add(lakers)
    db.session.add(nets)

    """
    TEAM_COMMENTS
    """

    team_comment_1 = Team_Comment(content="Nice mix!",
                                  user_id=1,
                                  team_id=2,
                                  created_at=datetime.now())
    team_comment_2 = Team_Comment(content="Almost as good as my team. I think we could take you!",
                                  user_id=2,
                                  team_id=1,
                                  created_at=datetime.now())
    team_comment_3 = Team_Comment(content="Pretty nice team you have here.",
                                  user_id=3,
                                  team_id=1,
                                  created_at=datetime.now())
    team_comment_4 = Team_Comment(content="Touche.",
                                  user_id=1,
                                  team_id=3,
                                  created_at=datetime.now())

    db.session.add(team_comment_1)
    db.session.add(team_comment_2)
    db.session.add(team_comment_3)
    db.session.add(team_comment_4)

    """
    POSTS
    """

    post_1 = Post(img_src='https://sportshub.cbsistatic.com/i/r/2020/02/08/121e4b15-5dc5-4f56-b61f-06fec18393e8/thumbnail/1200x675/9eda2f8b521a3e4e2cd6fe87f70adc37/lebron-james-lakers.jpg',
                  caption='Lebron knows how to get up',
                  player_id=1,
                  user_id=2,
                  created_at=(datetime.now()))
    post_2 = Post(img_src='https://img.bleacherreport.net/img/images/photos/002/220/088/163969370_crop_exact.jpg?w=1200&h=1200&q=75',
                  caption="J-Terry wasn't ready",
                  player_id=1,
                  user_id=1,
                  created_at=(datetime.now()))
    post_3 = Post(img_src='https://www.si.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cg_faces:center%2Cq_auto:good%2Cw_768/MTg2MzEyMzcwOTU0NDQ1OTUz/lebron-james-usa-today-12-28-21.png',
                  caption="He's feeling it!",
                  player_id=1,
                  user_id=3,
                  created_at=(datetime.now()))
    post_4 = Post(img_src='https://cdn.vox-cdn.com/thumbor/Yn_2orsSS2KFs7Vf8-FzXLGF29A=/0x0:3000x2525/1200x800/filters:focal(1611x80:2091x560)/cdn.vox-cdn.com/uploads/chorus_image/image/58285477/889219382.jpg.0.jpg',
                  caption="Chris got this one.",
                  player_id=6,
                  user_id=1,
                  created_at=(datetime.now()))
    post_5 = Post(img_src='https://clippers.newssurge.com/albums_clippers/chris-paul/Chris_Paul_driving_layup_past_Devin_Harris_in_Dallas.sized.jpg',
                  caption="To the rack!",
                  player_id=6,
                  user_id=2,
                  created_at=(datetime.now()))
    post_6 = Post(img_src='https://wallpaper.dog/large/11029765.jpg',
                  caption="Kobe over Lebron!",
                  player_id=7,
                  user_id=2,
                  created_at=(datetime.now()))
    post_7 = Post(img_src='https://miro.medium.com/max/2004/1*x6qp1QLU93jaMvZkTAqIFA.jpeg',
                  caption="Kobe's fired up!",
                  player_id=7,
                  user_id=2,
                  created_at=(datetime.now()))

    db.session.add(post_1)
    db.session.add(post_2)
    db.session.add(post_3)
    db.session.add(post_4)
    db.session.add(post_5)
    db.session.add(post_6)
    db.session.add(post_7)

    """
    POST_COMMENTS
    """

    post_comment_1 = Post_Comment(content="That's just too awesome!",
                                  user_id=2,
                                  post_id=1,
                                  created_at=datetime.now())
    post_comment_2 = Post_Comment(content="This was one of my favorite moments.",
                                  user_id=2,
                                  post_id=2,
                                  created_at=datetime.now())
    post_comment_3 = Post_Comment(content="So crazy",
                                  user_id=3,
                                  post_id=1,
                                  created_at=datetime.now())
    post_comment_4 = Post_Comment(content="Great stuff over here.",
                                  user_id=3,
                                  post_id=2,
                                  created_at=datetime.now())

    db.session.add(post_comment_1)
    db.session.add(post_comment_2)
    db.session.add(post_comment_3)
    db.session.add(post_comment_4)

    db.session.commit()


def undo_database():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE teams RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE team_comments RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE post_comments RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE players RESTART IDENTITY CASCADE;')
    db.session.commit()
