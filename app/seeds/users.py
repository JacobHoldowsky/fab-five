from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='DemoUser', email='DemoUser@gmail.com', password='Pass!1')
    phil_jackson = User(
        username='PhilJackson', email='PhilJackson@gmail.com', password='Pass!1')
    mark_cuban = User(
        username='MarkCuban', email='MarkCuban@gmail.com', password='Pass!1')

    demo.followed.append(phil_jackson)
    demo.followed.append(mark_cuban)
    phil_jackson.followed.append(demo)
    phil_jackson.followed.append(mark_cuban)
    mark_cuban.followed.append(demo)
    mark_cuban.followed.append(phil_jackson)
    
    db.session.add(demo)
    db.session.add(phil_jackson)
    db.session.add(mark_cuban)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
