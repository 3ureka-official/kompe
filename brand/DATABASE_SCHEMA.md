# データベーススキーマ（コンテスト関連）

## コンテストテーブル

```sql
-- コンテスト
CREATE TABLE contests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  
  -- 基本情報
  title VARCHAR(255) NOT NULL,
  image_url TEXT, -- イメージ画像URL
  description TEXT NOT NULL, -- リッチテキスト形式
  
  -- 日程
  start_at TIMESTAMP WITH TIME ZONE NOT NULL,
  end_at TIMESTAMP WITH TIME ZONE NOT NULL,
  
  -- 報酬設定
  prize_pool DECIMAL(10,2) NOT NULL, -- 総報酬額
  rewards JSONB NOT NULL, -- 順位ごとの報酬額 [{rank: 1, amount: 30000}, {rank: 2, amount: 15000}]
  
  -- 審査基準
  criteria VARCHAR(50) NOT NULL CHECK (criteria IN ('views', 'likes', 'brand')),
  
  -- ステータス
  status VARCHAR(50) NOT NULL DEFAULT 'draft' 
    CHECK (status IN ('draft', 'payment_pending', 'active', 'ended', 'judging', 'completed')),
  
  -- 支払い情報
  payment_intent_id VARCHAR(255),
  platform_fee DECIMAL(10,2) DEFAULT 0,
  
  -- タイムスタンプ
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_contests_brand_id ON contests(brand_id);
CREATE INDEX idx_contests_status ON contests(status);
CREATE INDEX idx_contests_start_at ON contests(start_at);
CREATE INDEX idx_contests_end_at ON contests(end_at);
```

## コンテストルールテーブル

```sql
-- コンテストルール（リッチテキスト対応）
CREATE TABLE contest_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contest_id UUID NOT NULL REFERENCES contests(id) ON DELETE CASCADE,
  content JSONB NOT NULL, -- TipTapのJSONデータ
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_contest_rules_contest_id ON contest_rules(contest_id);
```

## コンテスト素材テーブル

```sql
-- コンテスト素材（ファイル添付）
CREATE TABLE contest_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contest_id UUID NOT NULL REFERENCES contests(id) ON DELETE CASCADE,
  
  -- ファイル情報
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(100) NOT NULL,
  file_size INTEGER NOT NULL,
  file_url TEXT NOT NULL,
  
  -- 表示設定
  is_downloadable BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  
  -- タイムスタンプ
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_contest_assets_contest_id ON contest_assets(contest_id);
```

## 応募テーブル

```sql
-- 応募
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contest_id UUID NOT NULL REFERENCES contests(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
  
  -- 応募内容
  video_url TEXT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- 成果指標
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  
  -- ステータス
  status VARCHAR(50) NOT NULL DEFAULT 'submitted'
    CHECK (status IN ('submitted', 'approved', 'rejected', 'winner')),
  
  -- 審査・報酬
  judge_score DECIMAL(5,2), -- ブランド判断の場合のスコア
  reward_amount DECIMAL(10,2), -- 獲得報酬額
  rank INTEGER, -- 最終順位
  
  -- タイムスタンプ
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_applications_contest_id ON applications(contest_id);
CREATE INDEX idx_applications_creator_id ON applications(creator_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_views_count ON applications(views_count DESC);
CREATE INDEX idx_applications_likes_count ON applications(likes_count DESC);
```

## ブランドテーブル

```sql
-- ブランド
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- 基本情報
  name VARCHAR(255) NOT NULL,
  logo_url TEXT,
  description TEXT,
  contact_email VARCHAR(255) NOT NULL,
  
  -- 認証情報
  auth_user_id VARCHAR(255) UNIQUE, -- Firebase Auth UID
  
  -- ステータス
  is_verified BOOLEAN DEFAULT false,
  
  -- タイムスタンプ
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_brands_auth_user_id ON brands(auth_user_id);
```

## データ例

### コンテスト作成時のデータ構造

```json
{
  "title": "夏の思い出動画コンテスト",
  "image_url": "https://example.com/contest-image.jpg",
  "description": {
    "type": "doc",
    "content": [
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "あなたの素敵な夏の思い出を共有しよう！"
          }
        ]
      }
    ]
  },
  "start_at": "2024-07-01T00:00:00Z",
  "end_at": "2024-08-31T23:59:59Z",
  "prize_pool": 50000,
  "rewards": [
    {"rank": 1, "amount": 30000},
    {"rank": 2, "amount": 15000},
    {"rank": 3, "amount": 5000}
  ],
  "criteria": "views"
}
``` 