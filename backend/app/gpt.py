import openai
from dotenv import load_dotenv
import os

# OpenAIのAPIキーを設定
load_dotenv('key.env')
openai.api_key = os.getenv('OPENAI_API_KEY')

# APIキーのテスト
try:
    # モデルを使ってテストリクエストを送信
    response = openai.ChatCompletion.create(
        model="gpt-4",  # 使用したいモデル名を指定
        messages=[{"role": "user", "content": "こんにちは"}]  # 入力メッセージ
    )
    
    print("APIキーは有効です。レスポンス:")
    print(response['choices'][0]['message']['content'])

# except openai.error.AuthenticationError:
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