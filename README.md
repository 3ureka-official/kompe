# Kompe

広告コンペを通したブランドとクリエイターのマッチングプラットフォーム。
<br>
ブランドが開催したPRコンペに対してクリエイターがショート動画を作成して参加。
<br>
再生数に基づいたランキングに沿って報酬が分配される。

## 使用技術

### フロントエンド

- Next.js
- TypeScript
- React

### ミドルウェア

- PostgreSQL

### インフラ

- Supabase

### その他

- Stripe
- TikTok API

## 環境構築

### 1. .envファイルの作成

1.1. .env.exampleを参照して`/brand`,`/creator`で.envファイルを作成してください

### 2. フロントエンドでのパッケージのインストール

2.1. `/brand`,`/creator`,`/`でインストールしてください
<br>
`pnpm i`

### 3. Stripe

3.1. stripeにログイン
<br>
`stripe login`

3.2. Webhook エンドポイントの設定
<br>
`/brand`と`/creator`で実行してください
<br>
`pnpm stripe`

3.3. STRIPE*WEBHOOK_SECRETの設定
`pnpm stripe`を実行した際に表示されたシークレットキー（`whsec*...`）を.envファイルの`STRIPE_WEBHOOK_SECRET`に設定してください

### 4. prisma

`/creator`で実行してください

4.1. スキーマの作成
<br>
`pnpx prisma db pull`
<br>
`pnpx prisma generate`
<br>
<br>

4.2 Code Editorの再起動
<br>
Code Editorを開き直してください
