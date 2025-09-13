export const formatJpy = (amountJpy: number | undefined) => {
  if (!amountJpy) return "¥0";
  return `¥${amountJpy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};
