"""
Flaskアプリケーションを作成し、設定や拡張機能を初期化の役割、アプリケーションの構成や設定に関するものが中心
DB接続の初期化、ブループリントの登録、その他のFlask拡張のセットアップなど
"""

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_migrate import Migrate
from flask_cors import CORS
from flask_admin.contrib.sqla import ModelView

# import os

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db" #データベース
# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")

# DB接続の初期化
db = SQLAlchemy(app)

migrate = Migrate(app, db)

#テーブルを作成するクラス
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    productname = db.Column(db.String(100), unique=True, nullable=False)
    money = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<User {self.productname}>'
      

# データベースを作成（最初に一度だけ実行）
with app.app_context():
    db.create_all()

# Flask-Adminの管理画面を設定
admin = Admin(app, name='商品名入力 Admin Panel', template_mode='bootstrap3')

# Userモデルを管理画面に追加
admin.add_view(ModelView(User, db.session))

# ルートの設定
@app.route('/')
def index():
    return 'Welcome to the Admin Panel!'

# アプリケーションを実行
if __name__ == '__main__':
    app.run(debug=True)
