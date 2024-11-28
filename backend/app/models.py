from flask import Flask
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from app import app, db


# テーブルを作成するクラス
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    productname = db.Column(db.String(100), unique=True, nullable=False)
    money = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f"<User {self.productname}>"

    def to_dict(self):
        return {"id": self.id, "productname": self.productname, "money": self.money}

    @staticmethod
    # フロントから入手したデータ（文字列の配列）を引数に格納
    def find_related_products(productname_value):
        # productname_valueに、フロントから受け取った配列を格納
        """
        レシピから、店にもその材料があるかを返す
        """
        # print(productname_value)

        # print(db.session.query(User.productname).first())

        # results = db.session.query(User).filter(User.productname.in_(productname_value)).all()

        # for user in results:
        #   print(user.productname)

        # list 型のデータを適切な形式に変換する
        return (
            db.session.query(User).filter(User.productname.in_(productname_value)).all()
        )

    @staticmethod
    # フロントから入手したデータ（文字列の配列）を引数に格納
    def get_price(productname_value):

        # クエリパラメータから商品名を取得
        return {
            "name": db.session.query(User)
            .filter(User.productname.in_(productname_value))
            .all(),
            "price": 100,
        }


class ProductModelView(ModelView):
    # フォームフィールドの設定
    form_columns = ["productname", "money"]  # 'productname' と 'money' をフォームに表示
    column_list = ["id", "productname", "money"]

    # 新しいアイテムの作成時にエラーを防ぐために
    def on_model_change(self, form, model, is_created):
        # 必要に応じてカスタム処理を追加できます
        if is_created:
            # 例えば、新しいプロダクトが作成されたときの処理を追加
            pass
        return super(ProductModelView, self).on_model_change(form, model, is_created)
