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
                   headshot_src='https://images.squarespace-cdn.com/content/v1/59efa1aa90badee876a094b1/1530828512489-VM32D16CUTB5GHQD2B92/Bron-lakers+-+Getty.jpg?format=1000w',
                   inside_rating=98,
                   outside_rating=83,
                   rebound_rating=98,
                   defense_rating=94,
                   hustle_rating=98
                   )

    kidd = Player(first_name='Jason',
                  last_name='Kidd',
                  position='PG',
                  headshot_src='https://www.nndb.com/people/924/000107603/jason-kidd-2.jpg',
                  inside_rating=94,
                  outside_rating=73,
                  rebound_rating=89,
                  defense_rating=90,
                  hustle_rating=94
                  )

    wade = Player(first_name='Dwyane',
                  last_name='Wade',
                  position='SG',
                  headshot_src='https://www.nba.com/resources/static/team/v2/heat/custom-projects/Player_Bios/imgs/2012-13-dwyane-wade.jpg',
                  inside_rating=96,
                  outside_rating=78,
                  rebound_rating=84,
                  defense_rating=92,
                  hustle_rating=95
                  )

    martin = Player(first_name='Kenyon',
                    last_name='Martin',
                    position='PF',
                    headshot_src='http://thehoopdoctors.com/wp-content/uploads/2014/11/kenyon_martin.jpg',
                    inside_rating=84,
                    outside_rating=52,
                    rebound_rating=88,
                    defense_rating=86,
                    hustle_rating=87
                    )

    howard = Player(first_name='Dwight',
                    last_name='Howard',
                    position='C',
                    headshot_src='https://nba.nbcsports.com/wp-content/uploads/sites/12/2010/11/howardface.jpg',
                    inside_rating=97,
                    outside_rating=54,
                    rebound_rating=94,
                    defense_rating=95,
                    hustle_rating=95
                    )

    paul = Player(first_name='Chris',
                  last_name='Paul',
                  position='PG',
                  headshot_src='https://i.pinimg.com/236x/0c/e1/a4/0ce1a45672e8b02bee94f68c2611c15e--chris-delia.jpg',
                  inside_rating=96,
                  outside_rating=88,
                  rebound_rating=78,
                  defense_rating=93,
                  hustle_rating=97
                  )

    bryant = Player(first_name='Kobe',
                    last_name='Bryant',
                    position='SG',
                    headshot_src='https://assets-sports.thescore.com/basketball/player/203/headshot.png',
                    inside_rating=97,
                    outside_rating=84,
                    rebound_rating=81,
                    defense_rating=90,
                    hustle_rating=98
                    )

    anthony = Player(first_name='Carmelo',
                     last_name='Anthony',
                     position='SF',
                     headshot_src='https://www.nicepng.com/png/detail/274-2746546_4-carmelo-anthony-carmelo-anthony.png',
                     inside_rating=94,
                     outside_rating=86,
                     rebound_rating=86,
                     defense_rating=82,
                     hustle_rating=88
                     )

    garnett = Player(first_name='Kevin',
                     last_name='Garnett',
                     position='PF',
                     headshot_src='https://lifetailored.com/wp-content/uploads/2017/05/21-Kevin-Garnett-415x319.jpg',
                     inside_rating=97,
                     outside_rating=70,
                     rebound_rating=95,
                     defense_rating=98,
                     hustle_rating=97
                     )

    oneal = Player(first_name='Shaquille',
                   last_name="O'neal",
                   position='C',
                   headshot_src='https://laverdadnoticias.com/__export/1636559000456/sites/laverdad/img/2021/11/10/shaquille_oneal_trato_de_hacer_una_compra_de_setenta_mil_dolares_en_walmart.jpeg_2090821642.jpeg',
                   inside_rating=99,
                   outside_rating=52,
                   rebound_rating=98,
                   defense_rating=98,
                   hustle_rating=96
                   )

    db.session.add(james)
    db.session.add(kidd)
    db.session.add(wade)
    db.session.add(martin)
    db.session.add(oneal)
    db.session.add(paul)
    db.session.add(bryant)
    db.session.add(anthony)
    db.session.add(garnett)
    db.session.add(howard)

    """
    TEAMS
    """
    bulls = Team(city='Chicago',
                 name='Bulls',
                 logo_src='https://pngimage.net/wp-content/uploads/2019/05/red-bull-logo-white-png-1.png',
                 players=[kidd, wade, james, martin, oneal],
                 user_id=1
                 )

    lakers = Team(city='Los Angeles',
                  name='Lakers',
                  logo_src='https://www.nba.com/lakers/sites/lakers/files/ts_180804logo.jpg?w=756&h=440',
                  players=[paul, bryant, anthony, garnett, howard],
                  user_id=2
                  )

    nets = Team(city='Brooklyn',
                name='Nets',
                logo_src='https://images.thdstatic.com/productImages/f7c5f737-51ed-47e0-b84d-80ea97446447/svn/black-applied-icon-wall-decals-nbop0303-64_1000.jpg',
                players=[kidd, bryant, james, garnett, oneal],
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
    db.session.commit()
