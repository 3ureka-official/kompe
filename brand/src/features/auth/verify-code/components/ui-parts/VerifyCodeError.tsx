import { AuthFormLink } from "@/features/auth/common/components/ui-elements/AuthFormLink";
import { FormErrorMessage } from "@/features/auth/common/components/ui-elements/FormErrorMessage";

interface VerifyCodeErrorProps {
  errorMessage: string;
}

export function VerifyCodeError({ errorMessage }: VerifyCodeErrorProps) {
  return (
    <div className="text-center">
      <div className="mb-4">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
      <h2 className="text-lg font-bold text-gray-800 mb-2">コード確認失敗</h2>
      <FormErrorMessage message={errorMessage} />
      <AuthFormLink href="/auth/login" text="ログインページへ" />
    </div>
  );
}
