export const ERROR_MESSAGES = {
  // Stripe関連エラー
  creator_has_no_connected_account: "Stripeアカウントが連携されていません",
  transfer_not_found: "送金情報が見つかりません",
  transfer_already_created: "既に送金が完了しています",
  insufficient_funds: "残高が不足しています",

  // 認証エラー
  unauthorized: "認証が必要です",
  session_expired: "セッションが期限切れです",

  // バリデーションエラー
  validation_error: "入力内容に問題があります",
  invalid_data: "無効なデータです",

  // ネットワークエラー
  network_error: "ネットワークエラーが発生しました",
  timeout: "タイムアウトが発生しました",

  // デフォルト
  unknown_error: "不明なエラーが発生しました",
} as const;
