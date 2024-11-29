import os

from dotenv import load_dotenv
from flask import request, jsonify

from openai import OpenAI

import json

# import openai

from app import app  # , db


@app.route("/")
def hello():
    return "Hello from Flask!"


@app.route("/chatgpt", methods=["POST"])
def openai():
    print("openai")

    client = OpenAI()
    # OpenAIのAPIキーを設定
    current_directory = os.path.dirname(
        os.path.abspath(__file__)
    )  # 現在のスクリプトのディレクトリ
    full_path = os.path.join(current_directory, "key.env")
    print(full_path)
    load_dotenv(full_path)
    openai_api_key = os.getenv("OPENAI_API_KEY")
    # 食材のリストダミー
    ingredients = ["卵", "玉ねぎ", "トマト", "鶏肉"]
    ingredients = request.get_json()
    print(ingredients)

    # 食材リストをテキスト化
    ingredient_text = ", ".join(ingredients)
    # モデルに対してテストリクエストを送信
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",  # GPT-4を指定
        messages=[
            {
                "role": "user",
                "content": (
                    f"次の食材を使った簡単なレシピをいくつか提案し,以下のjson形式で出力してください。\n"
                    f"余計な説明は不要で指定した形式だけで出力してください。指定した形式は必ず守ってください\n"
                    f"食材: {ingredient_text}\n"
                    "{\n"
                    '  "id": 1,\n'
                    '  "name": "",\n'
                    '  "ingredient": [],\n'
                    '  "ingredient_hiragana": [],\n'
                    '  "procedure": {\n'
                    '    "1": "",\n'
                    '    "2": "",\n'
                    '    "3": ""\n'
                    "  }\n"
                    "}"
                ),
            }
        ],
    )

    # print("APIキーは有効です。レスポンス:")
    text = response.choices[0].message.content
    recipes = {}
    try:
        recipes = json.loads(text)
        print("===")
        print(recipes)
        print("===")
        print(type(recipes))
        print("===")
    except json.JSONDecodeError as e:
        print("JSONのパースに失敗しました:", e)
        print("レスポンス内容:", text)

    # print(type(jsonify(text)))
    return jsonify(recipes)


@app.route("/database", methods=["POST"])
def product():
    # ダミーデータ
    # productname_value=["にんじん", "はくさい"]
    # ダミーデータと、データベースの中身が一致したデータ
    # products = User.find_related_products(productname_value)
    # リストでもrequest.get_json()で行けるらしい
    data = request.get_json()
    print(data)  # フロントからデータ受け渡し〇
    products = User.find_related_products(data)
    print(products)  # から
    # 結果を表示 (ここで productname 属性を表示)
    # 一致したデータの、データベースを参照
    product_list = [user.productname for user in products]
    price_list = [user.money for user in products]
    # print(product_list)  # から
    # answer =  ', '.join(product_list)  # 商品名のリストをカンマ区切りで返す
    # price =  ', '.join(price_list)  # 商品名のリストをカンマ区切りで返す
    answer = ", ".join(product_list).split(", ")  # 商品名のリストをカンマ区切りで返す
    price = ", ".join(price_list).split(", ")  # 商品名のリストをカンマ区切りで返す
    # print(answer)  # から
    response = [
        {"name": product_name, "price": product_price}
        for product_name, product_price in zip(answer, price)
    ]
    # print(response)
    # response = [
    #     {"name": product_name, "price": price_list} for product_name in answer.split(', ')
    # ]
    # 日本語を返すために、レスポンスのエンコーディングを明示的に指定
    return jsonify(response)
