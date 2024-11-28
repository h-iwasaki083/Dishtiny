"""
Flaskアプリケーションを作成し、設定や拡張機能を初期化の役割、アプリケーションの構成や設定に関するものが中心
DB接続の初期化、ブループリントの登録、その他のFlask拡張のセットアップなど
"""
import os
from flask import Flask, jsonify, Response, request
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_migrate import Migrate
from flask_cors import CORS
from flask_admin.contrib.sqla import ModelView
from dotenv import load_dotenv
import json

# import os

app = Flask(__name__)
CORS(app)

app.json.ensure_ascii = False 

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db" #データベース
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
#app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")

#シークレットキーの読み込み
load_dotenv('key.env')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')


app.config['CSRF_ENABLED'] = True

# DB接続の初期化
db = SQLAlchemy(app)

#migrate = Migrate(app, db)

#ダミーデータ
#productname_value=["にんじん", "はくさい"]

#テーブルを作成するクラス
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     productname = db.Column(db.String(100), unique=True, nullable=False)
#     money = db.Column(db.String(100), nullable=False)

#     def __repr__(self):
#         return f'<User {self.productname}>'
      
#     def to_dict(self):
#         return {
#           'id': self.id,
#           'productname': self.productname,
#           'money': self.money         }
    
    
    
#     @staticmethod
#     #フロントから入手したデータ（文字列の配列）を引数に格納
#     def find_related_products(productname_value):
#         #productname_valueに、フロントから受け取った配列を格納
#         """
#         レシピから、店にもその材料があるかを返す
#         """
#         #print(productname_value)
        
#         #print(db.session.query(User.productname).first())
        
#         # results = db.session.query(User).filter(User.productname.in_(productname_value)).all()
        
#         # for user in results:
#         #   print(user.productname)
        
#         #list 型のデータを適切な形式に変換する
#         return db.session.query(User).filter(User.productname.in_(productname_value)).all()
    
#     @staticmethod
#     #フロントから入手したデータ（文字列の配列）を引数に格納
#     def get_price(productname_value):
        
#     # クエリパラメータから商品名を取得
#         return {"name": db.session.query(User).filter(User.productname.in_(productname_value)).all(), "price": 100}
        

# データベースを作成（最初に一度だけ実行）
# with app.app_context():
#     db.create_all()

# Flask-Adminの管理画面を設定
admin = Admin(app, name='商品名入力 Admin Panel', template_mode='bootstrap3')

#チェックのために作成
# @app.route('/admin/check')
# def check_admin_db():
#     tables = {}
#     for model in db.Model.__subclasses__():
#         records = model.query.all()
#         tables[model.__tablename__] = {
#             'count': len(records),
#             'data': [record.__dict__ for record in records]
#         }
#     return jsonify(tables)

# ModelViewのカスタマイズ
# class ProductModelView(ModelView):
#     # フォームフィールドの設定
#     form_columns = ['productname', 'money']  # 'productname' と 'money' をフォームに表示
#     column_list = ['id', 'productname', 'money']

#     # 新しいアイテムの作成時にエラーを防ぐために
#     def on_model_change(self, form, model, is_created):
#         # 必要に応じてカスタム処理を追加できます
#         if is_created:
#             # 例えば、新しいプロダクトが作成されたときの処理を追加
#             pass
#         return super(ProductModelView, self).on_model_change(form, model, is_created)

from .models import User, ProductModelView

# Userモデルを管理画面に追加
admin.add_view(ProductModelView(User, db.session))

# ルートの設定
@app.route('/')
def index():
    return 'Welcome to the Admin Panel!'

#商品の文字列が返ってくるかテスト  
# @app.route('/admin/product')
# def product():
    
#     #ダミーデータと、データベースの中身が一致したデータ
#     products = User.find_related_products(productname_value)
    
    
#     # 結果を表示 (ここで productname 属性を表示)
#     #一致したデータの、データベースを参照
#     product_list = [user.productname for user in products]
#     price_list = [user.money for user in products]
    
#     # answer =  ', '.join(product_list)  # 商品名のリストをカンマ区切りで返す
#     # price =  ', '.join(price_list)  # 商品名のリストをカンマ区切りで返す
    
#     answer =  ', '.join(product_list).split(', ')  # 商品名のリストをカンマ区切りで返す
#     price =  ', '.join(price_list).split(', ')  # 商品名のリストをカンマ区切りで返す
    
#     response = [
#         {"name": product_name, "price": int(product_price)}
#         for product_name, product_price in zip(answer, price)
#     ]
    
#     # response = [
#     #     {"name": product_name, "price": price_list} for product_name in answer.split(', ')
#     # ]
  
#     # 日本語を返すために、レスポンスのエンコーディングを明示的に指定
#     return jsonify(response)

# アプリケーションを実行
if __name__ == '__main__':
    app.run(debug=True)
