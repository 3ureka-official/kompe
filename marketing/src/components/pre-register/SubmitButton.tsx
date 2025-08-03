interface SubmitButtonProps {
  isSubmitting: boolean;
  buttonText?: string;
}

export function SubmitButton({
  isSubmitting,
  buttonText = "事前登録を完了する",
}: SubmitButtonProps) {
  return (
    <div className="text-center">
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-gradient-to-r from-[#FE2C55] to-[#FF0050] text-white px-12 py-4 rounded-full font-bold text-lg hover:from-[#e02549] hover:to-[#e6004a] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            送信中...
          </span>
        ) : (
          buttonText
        )}
      </button>
    </div>
  );
}
