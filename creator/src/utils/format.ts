import { ja } from "date-fns/locale";
import { format } from "date-fns";

export const formatJpy = (amountJpy: number | undefined) => {
  if (!amountJpy) return "¥0";
  return `¥${amountJpy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export function formatDateTime(date: Date | undefined) {
  if (!date) return "";

  return date.toLocaleString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDate(date: Date | undefined, formatStr = "yyyy-MM-dd") {
  if (!date) return "";

  return format(date, formatStr, {
    locale: ja,
  });
}

/**
 * 期間を表示用にフォーマットします
 * 開始日と終了日の年が同じ場合は、開始日の年を省略します
 * 例: "1月1日 〜 2025年3月31日" または "2024年12月1日 〜 2025年1月31日"
 *
 * @param startDate 開始日
 * @param endDate 終了日
 * @returns フォーマットされた期間文字列
 */
export function formatPeriod(
  startDate: string | Date | null | undefined,
  endDate: string | Date | null | undefined,
): string {
  if (!startDate || !endDate) return "-";

  const currentYear = new Date().getFullYear();

  const start = new Date(startDate);
  const end = new Date(endDate);

  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  const startFormatted =
    startYear === currentYear
      ? formatDate(start, "M月d日")
      : formatDate(start, "yyyy年M月d日");
  const endFormatted =
    endYear === currentYear
      ? formatDate(end, "M月d日")
      : formatDate(end, "yyyy年M月d日");

  return `${startFormatted} 〜 ${endFormatted}`;
}
