import { ERROR_MESSAGES } from "@/constants/errorCode.constant";

export const getErrorMessage = (error: Error): string => {
  if (!error?.message) {
    return ERROR_MESSAGES.unknown_error;
  }

  const errorMessage = error.message.toLowerCase();

  // エラーメッセージに含まれるキーワードをチェック
  for (const [key, message] of Object.entries(ERROR_MESSAGES)) {
    if (errorMessage.includes(key)) {
      return message;
    }
  }

  // マッチしない場合は元のメッセージを返す
  return error.message;
};
