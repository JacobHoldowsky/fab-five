from turtle import position
from app.models import db, Team, TeamComment, Post, PostComment, Player


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
                 player_1=kidd,
                 player_2=wade,
                 player_3=james,
                 player_4=martin,
                 player_5=oneal,
                 user_id=1
                 )
    
    lakers = Team(city='Los Angeles',
                  name='Lakers',
                  logo_src='https://www.nba.com/lakers/sites/lakers/files/ts_180804logo.jpg?w=756&h=440',
                  player_1=paul,
                  player_2=bryant,
                  player_3=anthony,
                  player_4=garnett,
                  player_5=howard,
                  user_id=2
                  )

    db.session.add(bulls)
    db.session.add(lakers)
    
    """
    Posts
    """

    db.session.commit()