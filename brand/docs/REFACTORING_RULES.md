# リファクタリングルール

## ディレクトリ構造

各ドメイン（contests, brand, auth等）は以下の構造で整理します：

```
features/[ドメイン]/
├── [サブドメイン]/     # 機能ごとのサブドメイン（例: login, signup, create, list等）
│   ├── components/
│   │   ├── ui-elements/     # 最小単位のUIコンポーネント
│   │   └── ui-parts/        # 複合UIコンポーネント
│   ├── hooks/              # サブドメイン固有のカスタムフック
│   └── pages/              # サブドメイン固有のページコンポーネント
├── common/                 # ドメイン内で共通のリソース
│   ├── components/
│   │   ├── ui-elements/     # 共通の基本UI要素
│   │   └── ui-parts/        # 共通の複合UI
│   └── hooks/              # ドメイン内で共通のカスタムフック
├── hooks/          # ドメイン全体で使用されるカスタムフック
├── schemas/         # バリデーションスキーマ（yup, zod等）
├── types/           # ドメイン固有の型定義
└── constants/      # ドメイン固有の定数
```

複数のドメインで使用される共通のものは `features/shared/` に配置します：

```
features/shared/
├── components/
│   ├── common/              # 複数ドメインで使用される共通コンポーネント
│   │   ├── ui-elements/     # 複数ドメインで使用される基本UI要素
│   │   └── ui-parts/        # 複数ドメインで使用される複合UI
│   └── pages/               # 複数ドメインで使用されるページコンポーネント
├── hooks/          # 複数ドメインで使用されるカスタムフック
├── types/           # 複数ドメインで使用される型定義
├── schemas/         # 複数ドメインで使用されるバリデーションスキーマ
└── constants/      # 複数ドメインで使用される定数
```

## 各ディレクトリの定義

### ui-elements

- **定義**: 最小単位の再利用可能なUIコンポーネント
- **配置場所**:
  - サブドメイン固有: `features/[ドメイン]/[サブドメイン]/components/ui-elements/`
  - ドメイン共通: `features/[ドメイン]/common/components/ui-elements/`
- **例**: AssetFileUpload, ContestStatusBadge等
- **特徴**:
  - ドメイン固有の基本UI要素
  - propsで動作を制御する
  - スタイリングのみを担当

### ui-parts

- **定義**: 複数のui-elementsを組み合わせた、より複雑なUIコンポーネント
- **配置場所**:
  - サブドメイン固有: `features/[ドメイン]/[サブドメイン]/components/ui-parts/`
  - ドメイン共通: `features/[ドメイン]/common/components/ui-parts/`
- **例**: BasicInfo, ContestCard, ContestHeader等
- **特徴**:
  - ドメイン固有のロジックを含む場合がある
  - ui-elementsを組み合わせて構成
  - ビジネスロジックを含む場合もある

### pages

- **定義**: ページコンポーネント（ロジックを含む親コンポーネント）
- **配置場所**:
  - サブドメイン固有: `features/[ドメイン]/[サブドメイン]/pages/`
- **例**: LoginPage, SignupPage, ContestCreatePage等
- **特徴**:
  - hooksを呼び出してロジックを処理
  - ui-partsコンポーネントにpropsを渡す
  - ルーティングと直接関連するコンポーネント

### hooks

- **定義**: カスタムフック
- **配置ルール**:
  - **サブドメイン固有**: `features/[ドメイン]/[サブドメイン]/hooks/` に配置
  - **ドメイン共通**: `features/[ドメイン]/common/hooks/` に配置（ドメイン全体で使用されるフックもここに配置）
- **例**:
  - `features/auth/login/hooks/useLoginForm.ts` - ログイン機能固有
  - `features/auth/common/hooks/useGetProfile.ts` - authドメイン内で共通
  - `features/contest/common/hooks/useGetContest.ts` - contestドメイン全体で使用
  - `features/contest/common/hooks/useUpdateContest.ts` - contestドメイン全体で使用
- **特徴**:
  - 状態管理やAPI呼び出しのロジックを含む
  - コンポーネントから分離された再利用可能なロジック
  - サブドメイン固有のhooksはそのサブドメイン配下に配置
  - ドメイン全体で使用されるhooksは`common/hooks/`に配置

### types

- **定義**: 型定義
- **配置ルール**:
  - **ドメイン固有の型**: `features/[ドメイン]/types/` に配置
  - **DB依存の共通型**: `types/` に配置（複数ドメインで使用される）
- **例**:
  - `features/contests/types/ContestFormData.ts` - フォーム用の型
  - `types/Contest.ts` - DBから取得するContestエンティティの型
- **特徴**:
  - TypeScriptの型定義
  - ドメインのエンティティやDTOを定義

### schemas

- **定義**: バリデーションスキーマ
- **配置ルール**:
  - **サブドメイン固有**: `features/[ドメイン]/[サブドメイン]/schemas/` に配置
  - **ドメイン全体**: `features/[ドメイン]/schemas/` に配置（複数のサブドメインで使用される場合）
- **例**:
  - `features/auth/login/schemas/loginUserSchema.ts` - ログイン機能固有
  - `features/auth/signup/schemas/createUserSchema.ts` - サインアップ機能固有
  - `features/contests/schemas/updateContestSchema.ts` - contestsドメイン全体で使用
- **特徴**:
  - yup, zod等のバリデーションライブラリを使用
  - フォームバリデーションに使用
  - サブドメイン固有のschemasはそのサブドメイン配下に配置
- **必須エクスポート**:
  - **型定義**: schemaファイルからフォームデータの型を`export type`でエクスポートする
  - **デフォルト値**: `defaultValues`を`export const`でエクスポートし、hooksで使用する
  - **例**:

    ```typescript
    // features/auth/login/schemas/loginUserSchema.ts
    export type LoginFormData = {
      email: string;
      password: string;
    };

    export const loginUserSchema = yup.object().shape({...});

    export const loginFormDefaultValues: LoginFormData = {
      email: "",
      password: "",
    };
    ```

### constants

- **定義**: ドメイン固有の定数
- **例**: CONTEST_STATUS_LABELS, CONTEST_CATEGORIES等
- **特徴**:
  - マジックナンバーや文字列を定数化
  - 設定値やオプション値

### components

- **定義**: ドメイン固有のコンポーネント
- **配置場所**:
  - **サブドメイン固有**: `features/[ドメイン]/[サブドメイン]/components/`
  - **ドメイン共通**: `features/[ドメイン]/common/components/`
- **構造**:
  - `[サブドメイン]/components/`: 機能ごとのサブドメイン（例: login, signup, create, list等）
    - `ui-elements/`: 機能固有の最小単位のUIコンポーネント
    - `ui-parts/`: 機能固有の複合UIコンポーネント
  - `common/components/`: ドメイン内で共通のコンポーネント
    - `ui-elements/`: 共通の基本UI要素
    - `ui-parts/`: 共通の複合UI
- **例**:
  - `login/components/ui-parts/LoginForm.tsx` - ログイン機能専用
  - `create/components/ui-elements/AssetFileUpload.tsx` - 作成画面専用
  - `create/components/ui-parts/BasicInfo.tsx` - 作成画面専用
  - `common/components/ui-parts/ContestHeader.tsx` - 複数画面で使用
- **特徴**:
  - 機能固有のコンポーネントは`[サブドメイン]/components/`配下に配置
  - ドメイン内で複数の機能で使用されるコンポーネントは`common/components/`配下に配置
- **共通コンポーネントの配置基準**:
  - **2つ以上のサブドメインで使用される**: `common/components/`に配置
  - **1つのサブドメインのみで使用される**: そのサブドメインの`components/`に配置
  - **例**:
    - `EmailField`, `PasswordField` - loginとsignupで共通使用 → `common/components/ui-parts/`
    - `FormErrorMessage`, `SubmitButton`, `AuthFormLink` - loginとsignupで共通使用 → `common/components/ui-parts/`
    - `LoginForm` - login専用 → `login/components/ui-parts/`
- **フォームコンポーネントのベストプラクティス**:
  - フォームフィールド（EmailField, PasswordField等）は再利用可能なコンポーネントとして`common/components/ui-parts/`に配置
  - エラーメッセージ表示、送信ボタン、リンク等も共通化して`common/components/ui-parts/`に配置
  - コンポーネントはpropsのみを受け取り、ロジックを含まない純粋なプレゼンテーションコンポーネントとする

### services

- **定義**: API呼び出しを行うサービス関数
- **例**: fetchContests, createContest等
- **特徴**:
  - Supabase等のAPIクライアントを使用してDB操作を行う
  - ビジネスロジックを含まない、純粋なAPI呼び出し関数
  - エラーハンドリングを含む
- **配置場所**: `src/services/`（ドメインごとにファイルを分ける）

## features/sharedについて

複数のドメインで使用される共通のリソースは `features/shared/` に配置します。

### 配置基準

- **2つ以上のドメインで使用される**: `features/shared/` に配置
- **1つのドメインのみで使用される**: そのドメインのディレクトリに配置
- **全ドメインで使用される汎用的なもの**: `components/ui/` に残す（例: Button, Input等の基本UI）
- **共通のコンポーネント**: 複数ドメインで使用されるが、UIコンポーネントではないものは `components/` に配置（例: AppGate, QueryProvider等）

### sharedの構造例

```
features/shared/
├── components/
│   ├── common/
│   │   ├── ui-elements/
│   │   │   └── CommonFileUpload.tsx
│   │   └── ui-parts/
│   │       └── CommonFormField.tsx
│   └── pages/
│       └── SharedPage.tsx
├── hooks/
│   └── useFileUpload.ts
├── types/
│   └── CommonTypes.ts
└── constants/
    └── common.constant.ts
```

## 移行ルール

### 現在の構造から新しい構造への移行

#### 1. コンポーネントの移行

**現在:**

```
components/
├── ui/                    # 共通UIコンポーネント
│   ├── Button.tsx
│   ├── Input.tsx
│   └── ...
├── contests/
│   ├── create/
│   │   ├── BasicInfo.tsx
│   │   └── ui/
│   │       └── AssetFileUpload.tsx
│   └── list/
│       └── ContestCard.tsx
```

**移行後:**

```
features/
├── contests/
│   ├── create/               # 作成機能のサブドメイン
│   │   ├── components/
│   │   │   ├── ui-elements/
│   │   │   │   └── AssetFileUpload.tsx
│   │   │   └── ui-parts/
│   │   │       └── BasicInfo.tsx
│   │   ├── hooks/
│   │   │   └── useContestFormState.ts
│   │   └── pages/
│   │       └── ContestCreatePage.tsx
│   ├── list/                 # 一覧機能のサブドメイン
│   │   ├── components/
│   │   │   └── ui-parts/
│   │   │       └── ContestCard.tsx
│   │   └── pages/
│   │       └── ContestListPage.tsx
│   ├── common/               # contestsドメイン内で共通
│   │   ├── components/
│   │   │   └── ui-parts/
│   │   │       └── ContestHeader.tsx
│   │   └── hooks/
│   │       └── useContestCommon.ts
│   ├── hooks/                # contestsドメイン全体で使用
│   │   └── useGetContest.ts
│   ├── types/
│   │   └── Contest.ts
│   ├── schemas/
│   │   └── createContestSchema.ts
│   └── constants/
│       └── contest.constant.ts
├── auth/
│   ├── login/                # ログイン機能のサブドメイン
│   │   ├── components/
│   │   │   └── ui-parts/
│   │   │       └── LoginForm.tsx
│   │   ├── hooks/
│   │   │   └── useLoginForm.ts
│   │   └── pages/
│   │       └── LoginPage.tsx
│   ├── common/               # authドメイン内で共通
│   │   └── components/
│   │       └── ui-parts/
│   │           └── CodeInputGroup.tsx
│   └── hooks/                # authドメイン全体で使用
│       └── useGetProfile.ts
├── shared/                   # 複数ドメインで使用される共通リソース
│   ├── components/
│   │   └── common/
│   │       └── ui-elements/
│   │           └── CommonFileUpload.tsx
│   ├── hooks/
│   │   └── useFileUpload.ts
│   └── types/
│       └── CommonTypes.ts
```

#### 2. 共通UIコンポーネントの扱い

**現在:**

```
components/ui/            # 全ドメインで使用される共通UI
```

**移行後:**

- 全ドメインで使用される汎用的なUI（Button, Input等）は `components/ui/` に残す
- 2つ以上のドメインで使用されるUIは `features/shared/components/common/ui-elements/` または `features/shared/components/common/ui-parts/` に移動
- サブドメイン固有のUIは各サブドメインの `features/[ドメイン]/[サブドメイン]/components/ui-elements/` または `features/[ドメイン]/[サブドメイン]/components/ui-parts/` に移動
- ドメイン内で複数の機能で使用されるUIは `features/[ドメイン]/common/components/ui-elements/` または `features/[ドメイン]/common/components/ui-parts/` に配置

#### 3. Hooksの移行

**現在:**

```
hooks/
├── contest/
│   ├── create/
│   │   └── useContestFormState.ts
│   └── useGetContest.ts
```

**移行後:**

```
features/contests/
├── create/
│   └── hooks/
│       └── useContestFormState.ts
├── common/
│   └── hooks/
│       ├── useGetContest.ts
│       ├── useUpdateContest.ts
│       └── useDeleteContest.ts
```

#### 4. Servicesの移行

**現在:**

```
services/
├── contestService.ts
├── brandService.ts
└── applicationService.ts
```

**移行後:**

```
src/services/
├── contestService.ts
├── brandService.ts
└── applicationService.ts
```

**注意**: Servicesは`src/services/`に配置し、ドメインごとにファイルを分ける

**サービス関数の例:**

```typescript
// src/services/contestService.ts
import { supabase } from "@/lib/supabase";
import { Contest } from "@/types/Contest";

export async function fetchContests(): Promise<Contest[]> {
  const { data, error } = await supabase
    .from("contests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Contest[];
}

export async function createContest(input: {
  title: string;
  description: string;
}): Promise<Contest> {
  const { data, error } = await supabase
    .from("contests")
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data as Contest;
}
```

#### 5. Typesの移行

**現在:**

```
types/
├── Contest.ts
├── Application.ts
└── Brand.ts
```

**移行後:**

- **DB依存の共通型**: `types/` に残す（複数ドメインで使用されるDBエンティティ）
- **ドメイン固有の型（DB依存でないもの）**: `features/[ドメイン]/types/` に移動

```
types/                      # DB依存の共通型
├── Contest.ts              # DBから取得するContestエンティティ
├── Application.ts          # DBから取得するApplicationエンティティ
└── Brand.ts                # DBから取得するBrandエンティティ

features/contests/types/    # contestsドメイン固有の型（DB依存でないもの）
├── ContestFormData.ts      # フォーム用の型
└── ContestCreateInput.ts   # 作成用の入力型

features/brand/types/       # brandドメイン固有の型（DB依存でないもの）
└── BrandFormData.ts        # フォーム用の型
```

#### 6. Schemasの移行

**現在:**

```
schema/
├── createContestSchema.ts
├── updateContestSchema.ts
├── loginUserSchema.ts
└── createUserSchema.ts
```

**移行後:**

```
features/contests/
├── create/
│   └── schemas/
│       └── createContestSchema.ts
└── schemas/
    └── updateContestSchema.ts

features/auth/
├── login/
│   └── schemas/
│       └── loginUserSchema.ts
├── signup/
│   └── schemas/
│       └── createUserSchema.ts
└── schemas/
    └── commonAuthSchema.ts
```

**注意**: サブドメイン固有のスキーマは`features/[ドメイン]/[サブドメイン]/schemas/`に配置。複数のサブドメインで使用される場合は`features/[ドメイン]/schemas/`に配置

#### 7. Constantsの移行

**現在:**

```
constants/
├── contest.constant.ts
└── auth.constant.ts
```

**移行後:**

```
features/contests/constants/
└── contest.constant.ts

features/auth/constants/
└── auth.constant.ts
```

## 命名規則

### ファイル名

- **コンポーネント**: PascalCase（例: `ContestCard.tsx`）
- **フック**: camelCaseで`use`で始める（例: `useContestFormState.ts`）
- **型定義**: PascalCase（例: `Contest.ts`）
- **スキーマ**: camelCaseで`Schema`で終わる（例: `createContestSchema.ts`）
- **定数**: camelCaseで`.constant.ts`で終わる（例: `contest.constant.ts`）

### ディレクトリ名

- **ドメイン名**: 小文字、複数形（例: `contests`, `brands`）
- **サブディレクトリ**: 小文字、ケバブケース（例: `ui-elements`, `ui-parts`）

## インポートパスの変更

### 移行前

```typescript
import { Contest } from "@/types/Contest";
import { useGetContest } from "@/hooks/contest/useGetContest";
import { createContestSchema } from "@/schema/createContestSchema";
import { CONTEST_STATUS_LABELS } from "@/constants/contest.constant";
```

### 移行後

```typescript
// ドメイン固有のリソース
import { ContestFormData } from "@/features/contests/types/ContestFormData";
import { useGetContest } from "@/features/contests/common/hooks/useGetContest";
import { useContestFormState } from "@/features/contests/create/hooks/useContestFormState";
import { fetchContests, createContest } from "@/services/contestService";
import { createContestSchema } from "@/features/contests/create/schemas/createContestSchema";
import { loginUserSchema } from "@/features/auth/login/schemas/loginUserSchema";
import { CONTEST_STATUS_LABELS } from "@/features/contests/constants/contest.constant";
import { ContestCard } from "@/features/contests/list/components/ui-parts/ContestCard";
import { AssetFileUpload } from "@/features/contests/create/components/ui-elements/AssetFileUpload";
import { ContestHeader } from "@/features/contests/common/components/ui-parts/ContestHeader";
import { useContestFormState } from "@/features/contests/create/hooks/useContestFormState";
import { ContestCreatePage } from "@/features/contests/create/pages/ContestCreatePage";

// DB依存の共通型
import { Contest } from "@/types/Contest";
import { Application } from "@/types/Application";

// 共通リソース（複数ドメインで使用）
import { CommonFileUpload } from "@/features/shared/components/common/ui-elements/CommonFileUpload";
import { useFileUpload } from "@/features/shared/hooks/useFileUpload";
import { CommonTypes } from "@/features/shared/types/CommonTypes";

// 汎用UIコンポーネント（全ドメインで使用）
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

// 共通コンポーネント
import { AppGate } from "@/components/app/AppGate";
import { QueryProvider } from "@/components/app/QueryProvider";
```

## 移行手順

1. **ドメインの特定**: 移行対象のドメインを決定
2. **ディレクトリ作成**: `features/[ドメイン]/`配下に必要なディレクトリを作成
3. **ファイル移動**: 該当ファイルを新しい場所に移動
4. **インポート更新**: すべてのインポートパスを更新
5. **動作確認**: テストを実行して動作を確認
6. **古いファイル削除**: 移行が完了したら古いファイルを削除

## 注意事項

- **汎用UIコンポーネント**: Button, Input等の全ドメインで使用される基本UIは `components/ui/` に残す
- **共通コンポーネント**: 複数ドメインで使用されるが、UIコンポーネントではないもの（AppGate, QueryProvider等）は `components/` に配置
- **共通リソース**: 2つ以上のドメインで使用される型、フック、コンポーネントは `features/shared/` に配置
- **ドメイン固有リソース**: 1つのドメインのみで使用されるものは `features/[ドメイン]/` に配置
- **Services**: API呼び出しを行うサービス関数は `src/services/` に配置（ドメインごとにファイルを分ける）
- **Typesの配置**:
  - DB依存の共通型（DBエンティティ等）は `types/` に配置
  - DB依存でないドメイン固有の型（フォーム用の型等）は `features/[ドメイン]/types/` に配置
- **移行は段階的に**: 1つのドメインずつ完了させる
- **テスト実行**: 各移行後にテストを実行して動作を確認する

## ディレクトリ構造の例

### contestsドメインの完全な構造例

```
features/contests/
├── create/                   # 作成機能のサブドメイン
│   ├── components/
│   │   ├── ui-elements/
│   │   │   └── AssetFileUpload.tsx
│   │   └── ui-parts/
│   │       ├── BasicInfo.tsx
│   │       ├── Brief.tsx
│   │       ├── Prize.tsx
│   │       └── Resources.tsx
│   ├── hooks/
│   │   ├── useContestFormState.ts
│   │   ├── useContestInit.ts
│   │   └── useContestSubmit.ts
│   └── pages/
│       └── ContestCreatePage.tsx
├── list/                     # 一覧機能のサブドメイン
│   ├── components/
│   │   └── ui-parts/
│   │       ├── ContestCard.tsx
│   │       └── ContestsPageHeader.tsx
│   └── pages/
│       └── ContestListPage.tsx
├── detail/                   # 詳細機能のサブドメイン
│   ├── components/
│   │   └── ui-parts/
│   │       ├── ContestOverview.tsx
│   │       └── ContestAssets.tsx
│   └── pages/
│       └── ContestDetailPage.tsx
├── common/                   # contestsドメイン内で共通
│   ├── components/
│   │   └── ui-parts/
│   │       └── ContestHeader.tsx
│   └── hooks/
│       ├── useGetContest.ts
│       ├── useUpdateContest.ts
│       └── useDeleteContest.ts
├── types/
│   ├── ContestFormData.ts
│   └── ContestCreateInput.ts
├── create/
│   └── schemas/
│       └── createContestSchema.ts
└── schemas/
    └── updateContestSchema.ts
└── constants/
    └── contest.constant.ts
```

**補足:**

- Servicesは`src/services/contestService.ts`に配置（ドメインごとにファイルを分ける）
- DBから取得する`Contest`エンティティの型は `types/Contest.ts` に配置（DB依存の共通型）
- フォーム用の型や入力型は `features/contests/types/` に配置（DB依存でないドメイン固有の型）

### features/sharedの構造例

```
features/shared/
├── ui-elements/
│   └── CommonFileUpload.tsx
├── hooks/
│   ├── useFileUpload.ts
│   └── useStorage.ts
├── types/
│   └── CommonTypes.ts
└── constants/
    └── common.constant.ts
```
