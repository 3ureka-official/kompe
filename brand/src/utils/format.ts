import { format } from "date-fns";
import { ja } from "date-fns/locale";

/**
 * ファイルサイズを人間が読みやすい形式にフォーマットします
 * @param bytes バイト数
 * @returns フォーマットされたファイルサイズ文字列
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * 日付を相対的な時間表示にフォーマットします
 * @param dateString 日付文字列
 * @returns フォーマットされた相対時間文字列
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60),
  );

  if (diffInHours < 1) {
    return "たった今";
  } else if (diffInHours < 24) {
    return `${diffInHours}時間前`;
  } else if (diffInHours < 48) {
    return "昨日";
  } else {
    return date.toLocaleDateString("ja-JP", {
      month: "short",
      day: "numeric",
    });
  }
}

/**
 * 日付を`date-fns`を使用して**日本語で**フォーマットします。
 * デフォルトは "PP" フォーマットです。
 *
 * https://date-fns.org/v4.1.0/docs/format
 *
 * @param date - フォーマットする日付
 * @param formatStr - 使用するフォーマット文字列 (デフォルトは "PP")
 * @returns フォーマットされた日付文字列
 */
export function formatDate(
  date: Parameters<typeof format>[0],
  formatStr = "PP",
) {
  return format(date, formatStr, {
    locale: ja,
  });
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("ja-JP").format(num);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(amount);
}
