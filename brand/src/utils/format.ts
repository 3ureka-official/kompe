/**
 * ファイルサイズを人間が読みやすい形式にフォーマットします
 * @param bytes バイト数
 * @returns フォーマットされたファイルサイズ文字列
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 日付を相対的な時間表示にフォーマットします
 * @param dateString 日付文字列
 * @returns フォーマットされた相対時間文字列
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return 'たった今';
  } else if (diffInHours < 24) {
    return `${diffInHours}時間前`;
  } else if (diffInHours < 48) {
    return '昨日';
  } else {
    return date.toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric'
    });
  }
}

/**
 * 日付を日本語形式でフォーマットします
 * @param dateString 日付文字列
 * @returns フォーマットされた日付文字列
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
} 