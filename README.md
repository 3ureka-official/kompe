# brand-contest

## 環境構築

1.  バックエンドセットアップ
    `/backend`で以下のコマンドを実行してください1. Python環境構築
    `python -m venv .venv`
    `source .venv/bin/activate`

        2. パッケージのインストール
        `pip install "fastapi[standard]" stripe supabase python-dotenv pydantic-settings`

        3. バックエンドサーバ起動
        `uvicorn main:app --reload --port 13000`

        4. apidoc.jsonの確認
        http://127.0.0.1:13000/openapi.json

2.  フロントエンドのパッケージインストール
    1. `/`,`/brand`,`/creator`でパッケージをインストールしてください
       `pnpm i`

    2. フロントエンドサーバ起動
       `pnpm dev`
