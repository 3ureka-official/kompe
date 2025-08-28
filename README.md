# brand-contest

## 環境構築

1. フロントエンドでのパッケージのインストール
   `/brand`,`/creator`,`/`でインストールしてください
   `pnpm i`

2. Stripe
   1. stripeにログイン
      `stripe login`

   2. Webhook エンドポイントの設定
      `/brand`で実行してください
      `pnpm stripe`

   3. STRIPE*WEBHOOK_SECRETの設定
      2を実行した際に表示されたシークレットキー（`whsec*...`）を.envファイルの`STRIPE_WEBHOOK_SECRET`に設定してください
