import os

from dotenv import load_dotenv
from openai import OpenAI

# 環境変数ファイルの読み込み
#dotenv_path = os.path.join(os.path.dirname(__file__), 'key.env')
#load_dotenv(dotenv_path)
load_dotenv('key.env')

# APIキーの確認

api_key = os.getenv('OPENAI_API_KEY')

# APIキーが空の場合のエラーチェック
if not api_key:
    raise ValueError("API キーが見つかりません。key.env ファイルを確認してください。")

# クライアントの作成
client = OpenAI(api_key=api_key)

def gpt(content):
    # プロンプトを設定
    messages = [
        {"role": "system", "content": "あなたは返答をすべてJSON形式で出力します。"},
        {"role": "user", "content": content},
    ]

    # OpenAIのChatCompletionを呼び出す
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",  # モデル名を更新
        messages=messages,
        temperature=0,
    )

    # レスポンスからメッセージ内容を取得
    return response.choices[0].message.content

# 関数を実行
result = gpt("1日分の朝昼夕食の献立を提案してください。")
print(result)