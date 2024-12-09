import os

from dotenv import load_dotenv
from flask import request, jsonify

from openai import OpenAI

import json

# import openai

from app import app  # , db


# @app.route("/")
# def hello():
#     return "Hello from Flask!"


@app.route("/chatgpt", methods=["POST"])
def openai():
    # print("openai")

    client = OpenAI()
    # OpenAIのAPIキーを設定
    current_directory = os.path.dirname(
        os.path.abspath(__file__)
    )  # 現在のスクリプトのディレクトリ
    full_path = os.path.join(current_directory, "key.env")
    # print(full_path)
    load_dotenv(full_path)
    openai_api_key = os.getenv("OPENAI_API_KEY")
    # 食材のリストダミー
    # ingredients = ["卵", "玉ねぎ", "トマト", "鶏肉"]
    ingredients = request.get_json()
    # print(ingredients)

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
                    f"食材: {ingredient_text}"
                    "{"
                    '  "id": "",'
                    '  "name": "",'
                    '  "ingredient": [],'
                    '  "ingredient_hiragana": [],'
                    '  "procedure": {'
                    '    "1": "",'
                    '    "2": "",'
                    '    "3": ""'
                    "  }"
                    "},"
                ),
            }
        ],
    )

    # print("APIキーは有効です。レスポンス:")
    text = response.choices[0].message.content
    # print("===")
    # print(type(text))
    # print(text)
    # print("===")
    recipes = {}
    try:
        recipes = json.loads(text)
        # print("===")
        # print(recipes)
        # print("===")
        # print(type(recipes))
        # print("===")
    except json.JSONDecodeError as e:
        print("JSONのパースに失敗しました:", e)
        print("レスポンス内容:", text)

    # print(type(jsonify(text)))
    return jsonify(recipes)
