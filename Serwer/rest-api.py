from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, backref
from sqlalchemy.orm import scoped_session, sessionmaker, Query
import pandas as pd
import json
import simplejson

engine = create_engine('postgresql://postgres:postgres@localhost:5433/postgres')
Base = declarative_base()
Base.metadata.reflect(engine)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5433/postgres'
db = SQLAlchemy(app)

class Users(Base):
    __table__ = Base.metadata.tables['users']

if __name__ == '__main__':
    db_session = scoped_session(sessionmaker(bind=engine))
    for item in db_session.query(Users.id, Users.name, Users.surname, Users.index, Users.role):
        print (item)



@app.route('/test', methods = ['GET'])
def test():
    db_session = scoped_session(sessionmaker(bind=engine))
    for item in db_session.query(Users.id, Users.name, Users.surname, Users.index, Users.role):
        print(item)
        return item.index

app.run(port=3000)