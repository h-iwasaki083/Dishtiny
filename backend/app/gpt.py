import os

import openai
from dotenv import load_dotenv

# 既存の環境変数をクリア
# os.environ.pop('OPENAI_API_KEY', None)
# OpenAIのAPIキーを設定
load_dotenv("key.env")
openai.api_key = os.getenv("OPENAI_API_KEY")

# APIキーのテスト
try:
    # モデルを使ってテストリクエストを送信
    response = openai.ChatCompletion.create(
        model="gpt-4",  # 使用したいモデル名を指定
        messages=[{"role": "user", "content": "こんにちは"}],  # 入力メッセージ
    )

    print("APIキーは有効です。レスポンス:")
    print(response["choices"][0]["message"]["content"])

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
    print(response.choices[0].message.content)

# except openai.AuthenticationError:
#     print("APIキーが無効です。正しいキーを使用してください。")
except Exception as e:
    print(f"エラーが発生しました: {e}")

# def gpt(content):
#     # プロンプトを設定
#     messages = [
#         {"role": "system", "content": "あなたは返答をすべてJSON形式で出力します。"},
#         {"role": "user", "content": content},
#     ]

#     # OpenAIのChatCompletionを呼び出す
#     response = openai.ChatCompletion.create(
#         model="gpt-4-turbo",
#         messages=messages,
#         temperature=0,
#     )

#     # レスポンスからメッセージ内容を取得
#     return response.choices[0].message["content"]

# # 関数を実行
# result = gpt("1日分の朝昼夕食の献立を提案してください。")
# print(result)
