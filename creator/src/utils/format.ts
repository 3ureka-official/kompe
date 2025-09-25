export const formatJpy = (amountJpy: number | undefined) => {
  if (!amountJpy) return "¥0";
  return `¥${amountJpy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export function formatDate(date: Date | undefined) {
  if (!date) return "";

  return date.toLocaleString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
