import os

import openai
from dotenv import load_dotenv

# 既存の環境変数をクリア
# os.environ.pop('OPENAI_API_KEY', None)
# OpenAIのAPIキーを設定
load_dotenv("key.env")
openai_api_key = os.getenv("OPENAI_API_KEY")
# api_key = os.getenv('OPENAI_API_KEY')

# APIキーが取得できているか確認
if openai_api_key:
    print("APIキー取得成功:", openai_api_key)
    # openai.api_key = openai_api_key
else:
    print("APIキーが取得できません。key.envファイルを確認してください。")
    exit()  # APIキーがない場合は終了

# 食材のリストダミー
ingredients = ["卵", "玉ねぎ", "トマト", "鶏肉"]

# APIキーのテスト
try:

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
