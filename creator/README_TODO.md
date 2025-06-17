 ## 🎯 実装タスクリスト

### [✅] タスク2: Tailwind設定とデザインシステム
```
Tailwind CSSのカスタム設定を行ってください：
- TikTokブランドカラー（primary: #25F4EE）設定
- フォント設定（Noto Sans JP, Inter）
- カスタムアニメーション追加（fade-in, slide-up, bounce-gentle等）
- globals.cssでベーススタイル定義
- スクロールバーカスタマイズ
- フォーカス・セレクション時のスタイル定義
```

### [✅] タスク3: 基本レイアウトコンポーネント
```
レイアウトコンポーネントを作成してください：
- Header.tsx（ロゴ、ナビ、ログインボタン、モバイルメニュー）
- Footer.tsx（リンク、コピーライト）
- layout.tsxでHeader/Footer組み込み

実装済み機能:
Header.tsx:
- TikTokブランドに合わせたグラデーションロゴ
- レスポンシブナビゲーション（デスクトップ・モバイル対応）
- 認証状態に応じた表示切り替え（仮実装）
- モバイルメニュー（ハンバーガーメニュー）
- Sticky positioning（スクロール時固定）
- アクティブページのハイライト表示

Footer.tsx:
- ブランド情報とロゴ
- サービス・サポート・法的情報・会社情報リンク
- ソーシャルメディアリンク（TikTok、Twitter、Instagram）
- レスポンシブグリッドレイアウト（5カラム→2カラム→1カラム）
- ホバーエフェクト付きリンク
- コピーライト表示

layout.tsx:
- Header/Footer統合
- 日本語対応（lang="ja"）
- SEO最適化メタデータ
- フレックスレイアウト（min-h-screen）
- メインコンテンツエリアの自動拡張（flex-1）
```

### [✅] タスク4: 基本UIコンポーネントセット
```
src/components/ui/配下に以下のコンポーネントを作成：
- Button.tsx（variants: primary/secondary/outline/ghost、sizes、loading対応）
- Input.tsx / Textarea.tsx（エラー表示、ラベル一体型）
- Card.tsx（基本カード、ホバーエフェクト）
- Badge.tsx / Chip.tsx（カテゴリ表示用）
- Skeleton.tsx（ローディング表示用）

実装済み機能:
Button.tsx:
- TikTokブランドカラー対応（primary-600: #25F4EE）
- 8つのバリアント（default, primary, destructive, outline, secondary, ghost, link, success, warning）
- 5つのサイズ（sm, default, lg, xl, icon）
- ローディング状態対応（loading prop + Loader2アイコン）
- forwardRef対応

Input.tsx:
- ラベル一体型（label prop）
- エラー表示（error prop）
- ヘルパーテキスト（helperText prop）
- TikTokブランドカラーのフォーカス状態
- アクセシビリティ対応（自動ID生成）

Textarea.tsx:
- Input.tsxと同様の機能
- リサイズ可能（resize-vertical）
- 最小高さ設定

Card.tsx:
- ホバーエフェクト対応（hover prop）
- 6つのサブコンポーネント（Header, Title, Description, Content, Footer）
- forwardRef対応
- TikTokブランドカラー

Badge.tsx:
- 8つのバリアント（default, secondary, destructive, outline, success, warning, category, status）
- 3つのサイズ（sm, default, lg）
- カテゴリ表示用の専用バリアント
- 丸角デザイン

Skeleton.tsx:
- シンプルなローディング表示
- animate-pulse対応
- カスタマイズ可能なクラス名
```

### [✅] タスク5: コンテスト表示用コンポーネント
```
コンテスト用コンポーネントを作成：
- types/contest.ts（Contest型定義）
- ContestCard.tsx（サムネイル、タイトル、賞金、締切等）
- ContestGrid.tsx（レスポンシブグリッドレイアウト）

実装済み機能:
types/contest.ts:
- ContestStatus型（upcoming, active, ended, judging, completed）
- ContestCategory型（9つのカテゴリ）
- Contest, ContestSummary, Prize インターface
- ContestFilters, ContestSortBy型
- CONTEST_CATEGORIES, CONTEST_STATUS定数（表示用メタデータ）

ContestCard.tsx:
- レスポンシブなカード表示
- サムネイル画像（ホバーエフェクト付き）
- ステータスバッジ（開催中・終了等）
- 締切カウントダウン表示
- ブランドロゴ・名前表示
- カテゴリ・タグバッジ
- 賞金額・参加者数表示
- 締切日時表示
- 詳細ページへのリンク

ContestGrid.tsx:
- レスポンシブグリッドレイアウト（1→2→3カラム）
- ローディング時のスケルトン表示
- 空状態の表示
- 各カードの高さ統一（h-full）

追加設定:
- @tailwindcss/line-clampプラグイン追加
- line-clamp-2クラスでテキスト省略対応
```

### [✅] タスク6: モックデータとデータ取得
```
モックデータシステムを構築：
- mock-data/contests.json（10件以上のサンプルデータ）
- lib/api/contests.ts（getContests、getContestById）
- hooks/useContests.ts、useContest.ts

実装済み機能:
mock-data/contests.json:
- 12件の多様なコンテストサンプルデータ
- 全カテゴリ（beauty, fashion, food, tech, lifestyle, sports, travel, education, entertainment）
- 各種ステータス（active, upcoming, completed, judging）
- リアルなデータ（賞金額、参加者数、日程、要件等）
- Unsplash画像URL使用

lib/api/contests.ts:
- getContestById(): 単一コンテスト詳細取得
- getContests(): フィルター・ソート・ページネーション対応一覧取得
- getPopularContests(): 人気コンテスト取得
- getLatestContests(): 新着コンテスト取得
- getDeadlineSoonContests(): 締切間近コンテスト取得
- getContestCountsByCategory(): カテゴリ別件数取得
- API遅延シミュレート（300-500ms）
- 包括的なフィルタリング（カテゴリ、ステータス、賞金額、タグ、検索）
- 7種類のソート（新着、古い順、賞金額、締切、人気度）

hooks/useContests.ts:
- コンテスト一覧管理用React Hook
- ローディング・エラー状態管理
- フィルター・ソート・検索状態管理
- ページネーション・無限スクロール対応
- loadMore()機能
- 自動フェッチ・手動リフレッシュ対応
- 状態リセット機能

hooks/useContest.ts:
- 単一コンテスト詳細管理用React Hook
- ローディング・エラー状態管理
- 自動フェッチ・手動リフレッシュ対応
- 404エラーハンドリング
- 状態リセット機能
```

### [✅] タスク7: コンテスト一覧ページ
```
app/contests/page.tsxを実装：
- ContestGrid使用
- カテゴリフィルター（複数選択可）
- ソート機能（賞金額順、締切順、新着順）
- ページネーション
- URLクエリパラメータ対応

実装済み機能:
components/contest/ContestFilters.tsx:
- 検索バー（タイトル・説明・ブランド名・タグ対応）
- フィルターボタン（アクティブ状態表示）
- ソートドロップダウン（7種類のソート）
- カテゴリフィルター（全9カテゴリ、複数選択可）
- ステータスフィルター（4種類、複数選択可）
- 賞金額フィルター（最小・最大金額指定）
- アクティブフィルター表示（削除可能なバッジ）
- フィルターリセット機能
- レスポンシブデザイン

components/ui/Pagination.tsx:
- ページ番号表示（省略記号対応）
- 前へ・次へボタン
- 最初・最後ページボタン
- 現在ページのハイライト
- レスポンシブ表示（モバイル対応）
- アクセシビリティ対応

hooks/useUrlParams.ts:
- URLクエリパラメータ管理
- フィルター・ソート・検索・ページ状態の同期
- ブラウザ履歴対応（戻る・進む）
- デフォルト値の自動削除
- パラメータのエンコード・デコード

app/contests/page.tsx:
- フィルター・ソート・検索機能統合
- URLパラメータとの同期
- ページネーション対応
- エラー・空状態の表示
- ローディング状態管理
- レスポンシブレイアウト
- SEO対応（ページタイトル・説明）
- スムーズスクロール（ページ変更時）
```

### [✅] タスク7.1: 応募コンテスト一覧ページ
```
app/applications/page.tsxを実装：
- ContestGrid使用
- タブ（開催中、終了）で表示分岐
- ページネーション
- URLクエリパラメータ対応

実装済み機能:
types/contest.ts:
- UserApplication, UserFavorite 型定義
- ApplicationTab, FavoriteTab 型定義
- APPLICATION_TABS, FAVORITE_TABS 定数追加

mock-data/applications.json:
- 8件の応募データ（pending, approved, rejected, winner 状態）
- 各種コンテストIDと関連付け

mock-data/favorites.json:
- 10件のお気に入りデータ
- 各種コンテストIDと関連付け

lib/api/applications.ts:
- getUserApplications(): タブ・フィルター・検索・ページネーション対応
- getUserApplication(): 応募状況取得
- getApplicationStats(): 応募統計取得

hooks/useApplications.ts:
- 応募コンテスト状態管理
- タブ・フィルター・検索・ページネーション対応
- 統計情報取得

components/ui/Tabs.tsx:
- 再利用可能なタブコンポーネント
- Tabs, TabsList, TabsTrigger, TabsContent
- 状態管理とイベント処理

app/applications/page.tsx:
- タブ切り替え（開催中・終了）
- 検索機能
- 統計情報カード（総応募数、開催中、受賞、審査中）
- URLパラメータ同期
- エラー・空状態の表示
- ページネーション対応
```

### [✅] タスク7.2: お気に入りコンテスト一覧ページ
```
app/favorites/page.tsxを実装：
- ContestGrid使用
- タブ（開催予定、開催中、終了）で表示分岐
- ページネーション
- URLクエリパラメータ対応

実装済み機能:
lib/api/favorites.ts:
- getUserFavorites(): タブ・フィルター・検索・ページネーション対応
- getUserFavorite(): お気に入り状況取得
- getFavoriteStats(): お気に入り統計取得

hooks/useFavorites.ts:
- お気に入りコンテスト状態管理
- タブ・フィルター・検索・ページネーション対応
- 統計情報取得

app/favorites/page.tsx:
- タブ切り替え（開催予定・開催中・終了）
- 検索機能
- 統計情報カード（総お気に入り数、開催予定、開催中、終了）
- URLパラメータ同期
- エラー・空状態の表示
- ページネーション対応
- 各タブ固有の空状態メッセージ
```

## Day 5-7: コンテスト閲覧機能

### [] タスク8: コンテスト詳細ページ
```
app/contests/[id]/page.tsxを実装：
- ヒーローセクション
- 賞金情報カード
- 開催期間・締切カウントダウン
- 詳細説明（リッチテキスト表示）
- 応募ボタン（固定表示）
```

---

## Day 8-9: Firebase Auth統合

### [] タスク9: Firebase設定と認証基盤
```
Firebase Authenticationを統合：
- lib/firebase/config.ts（初期化）
- lib/firebase/auth.ts（認証関数）
- 環境変数設定（.env.local）
※一旦メール認証で実装、TikTok OAuthは後回し
```

### [] タスク10: 認証Context実装
```
認証状態管理システムを作成：
- contexts/AuthContext.tsx（user、loading、error状態）
- hooks/useAuth.ts
- components/auth/AuthGuard.tsx
- layout.tsxでAuthProvider設定
```

### [] タスク11: ログインページ実装
```
app/auth/login/page.tsxを作成：
- 中央配置のログインカード
- TikTokログインボタン（デザイン重視）
- エラー表示
- リダイレクト処理
```

---

## Day 10-11: 応募機能とマイページ

### [] タスク12: 応募フロー実装
```
コンテスト応募機能を実装：
- app/contests/[id]/apply/page.tsx（URL入力）
- app/contests/[id]/apply/confirm/page.tsx（確認画面）
- app/contests/[id]/apply/complete/page.tsx（完了画面）
- LocalStorageに保存（バックエンドなし）
```

### [] タスク13: ダッシュボード実装
```
app/dashboard/page.tsxを作成：
- ウェルカムメッセージ
- 統計カード（応募数、獲得賞金等）
- 最近の応募一覧
- 各種設定へのナビゲーション
```

### [] タスク14: プロフィール関連ページ
```
プロフィール管理ページを作成：
- app/profile/page.tsx（基本情報）
- app/settings/bank/page.tsx（銀行口座）
- app/my-submissions/page.tsx（応募履歴）
```

---

## Day 12-14: 仕上げとテスト

### [] タスク15: エラー処理とローディング
```
UX向上のための実装：
- app/error.tsx（エラーバウンダリ）
- app/not-found.tsx（404ページ）
- 各ページにloading.tsx追加
- トースト通知実装
```

### [] タスク16: レスポンシブ対応確認
```
全ページのレスポンシブ対応：
- Mobile/Tablet/Desktop対応確認
- ナビゲーション切り替え
- グリッドレイアウト調整
- タッチターゲットサイズ確認（最小44px）
```

---