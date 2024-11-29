from flask import Flask
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy


# テーブルを作成するクラス
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    productname = db.Column(db.String(100), unique=True, nullable=False)
    money = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f"<User {self.productname}>"
