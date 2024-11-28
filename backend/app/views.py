import os

from dotenv import load_dotenv
from flask import jsonify, request
from openai import OpenAI

from app import app  # , db

from . import User


@app.route("/")
def hello():
    return "Hello from Flask!"


@app.route("/database", methods=["GET"])
def product():

    # ダミーデータ
    # productname_value=["にんじん", "はくさい"]

    # ダミーデータと、データベースの中身が一致したデータ
    # products = User.find_related_products(productname_value)

    # リストでもrequest.get_json()で行けるらしい
    data = request.get_json()
    products = User.find_related_products(data)

    # 結果を表示 (ここで productname 属性を表示)
    # 一致したデータの、データベースを参照
    product_list = [user.productname for user in products]
    price_list = [user.money for user in products]

    # answer =  ', '.join(product_list)  # 商品名のリストをカンマ区切りで返す
    # price =  ', '.join(price_list)  # 商品名のリストをカンマ区切りで返す

    answer = ", ".join(product_list).split(", ")  # 商品名のリストをカンマ区切りで返す
    price = ", ".join(price_list).split(", ")  # 商品名のリストをカンマ区切りで返す

    response = [
        {"name": product_name, "price": int(product_price)}
        for product_name, product_price in zip(answer, price)
    ]

    # response = [
    #     {"name": product_name, "price": price_list} for product_name in answer.split(', ')
    # ]

    # 日本語を返すために、レスポンスのエンコーディングを明示的に指定
    return jsonify(response)


# 以下はchatgptのテスト

# @app.route("/chatgpt")
# def openai():
#     #.envファイルの読み込み
#     load_dotenv('key.env')

#     client = OpenAI()

#     # APIキーの設定
#     openai.api_key = os.getenv('OPENAI_API_KEY')

#     # GPTによる応答生成
#     prompt = "以下の条件の下でおいしい食べ物を教えてください。\n条件1:和食\n条件2:甘い"
#     response = client.chat.completions.create(
#                         model = "gpt-3.5-turbo",
#                         messages = [
#                             {"role": "system", "content": "You are a helpful assistant."},
#                             {"role": "user", "content": prompt}
#                         ],
#                         temperature=0
#                     )

#     # 応答の表示
#     text = response['choices'][0]['message']['content']
#     print(text)

#     return text
