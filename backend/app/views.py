import os

from dotenv import load_dotenv
from openai import OpenAI

from app import app  # , db


@app.route("/")
def hello():
    return "Hello from Flask!"


app.route("/chatgpt")


def openai():
    # OpenAIのAPIキーを設定
    load_dotenv("key.env")
    openai_api_key = os.getenv("OPENAI_API_KEY")
    # 食材のリストダミー
    ingredients = ["卵", "玉ねぎ", "トマト", "鶏肉"]
    # 食材リストをテキスト化
    ingredient_text = ", ".join(ingredients)
    # モデルに対してテストリクエストを送信
    response = openai.chat.completions.create(
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
                    '  "ingredient_kana": [],\n'
                    '  "procedure": {\n'
                    '    1: "",\n'
                    '    2: "",\n'
                    '    3: ""\n'
                    "  }\n"
                    "}"
                ),
            }
        ],
    )

    # print("APIキーは有効です。レスポンス:")
    text = response.choices[0].message.content
    print(text)
    return text
