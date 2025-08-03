## ディレクトリ構成

```bash
src/
├─ app/            # Next.js App Router 用のルーティング
├─ features/       # ドメインごとの機能（note, auth など）
│   ├─ components/ # ページごとのコンポーネント
│   ├─ hooks/      # ページごとのhooks
│   ├─ service/    # ページごとのサービスファイル
├─ components/     # 共通コンポーネント
├─ lib/            # Firebaseなどのクライアント
├─ types/          # 型定義
├─ styles/
```
