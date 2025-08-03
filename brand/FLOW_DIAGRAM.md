# ブランド側画面遷移図

```mermaid
graph TD
    A[トップページ /] --> B[コンテスト一覧 /contests]
    A --> C[コンテスト作成 /contests/create]
    A --> D[ブランド設定 /settings]

    B --> E[コンテスト詳細 /contests/[id]]
    B --> C

    C --> F[作成完了]
    F --> B

    E --> G[応募一覧 /contests/[id]/applications]
    E --> H[ランキング /contests/[id]/leaderboard]
    E --> I[編集 /contests/[id]/edit]

    G --> J[応募詳細 /contests/[id]/applications/[applicationId]]

    I --> E

    D --> K[設定保存完了]
    K --> D
```

## 画面詳細

### 1. トップページ (/)

- サービス概要表示
- 主要機能へのナビゲーション
- コンテスト作成へのCTA

### 2. コンテスト一覧 (/contests)

- 開催中・終了済みコンテストの表示
- フィルター・ソート機能
- 新規作成ボタン

### 3. コンテスト作成 (/contests/create)

- タイトル、説明文入力
- 開始・終了日設定
- 報酬額設定
- 審査基準選択
- リッチテキストエディター使用

### 4. コンテスト詳細 (/contests/[id])

- コンテスト情報表示
- 応募状況確認
- ランキング表示
- 編集・管理機能

### 5. ブランド設定 (/settings)

- ブランド情報編集
- 連絡先設定
- プロフィール管理

## 状態管理

### コンテストステータス

- draft: 下書き
- payment_pending: 支払い待ち
- active: 開催中
- ended: 終了
- judging: 審査中
- completed: 完了
