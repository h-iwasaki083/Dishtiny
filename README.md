## リポジトリのクローン
```bash:クローン
git clone https://github.com/h-iwasaki083/Dishtiny.git
```

mainブランチのコードをクローンした後、以下の要領で環境構築と動作確認をよろしくお願いします。

## バックエンド
> Dishtiny/backendの階層で以下を進めてください

1. 仮想環境の構築<br>
　私はvenvという仮想環境を使いました！色々あるそうなので使い慣れていたりお好みのもので良いと思います。<br>
　venvの場合は以下のコードの通りです。

```bash:仮想環境
# 仮想環境の作成
python -m venv venv

# 仮想環境の起動
## windows_bashの場合
source venv/Scripts/activate

## windows_コマンドプロンプトの場合
venv/Scripts/activate

## macの場合
source venv/bin/activate
```

3. 必要なライブラリ・フレームワークのインストール<br>
こちらもanacondaなどお好みのものを使ってください。私はpipを使ったので以下の手順でインストールしました。<br>
最終的にrequirements.txtの中身が全てインストールされれば問題ないと思います。
```bash:インストール
pip install -U -r requirements.txt
```

4. ローカルサーバーの起動
```bash:サーバー起動
python run.py
```
http://localhost:5000/ にアクセスすることができたら成功です。


## フロントエンド
> Dishtiny/frontendの階層で以下を進めてください<br>
> 知識が付け焼刃なので、上手く行かなかったらすみません、調べます…。

1. Node.jsのインストール<br>
   https://www.sejuku.net/blog/72545<br>
   などを参考にインストールしてください。

3. 必要なライブラリ・フレームワークのインストール<br>
package.jsonに記載されている情報を元にインストールされます。
```bash:インストール
npm install
```

3. ローカルサーバーの起動
```bash:サーバー起動
npm run dev
```
http://localhost:5173/ にアクセスすることができたら成功です。
