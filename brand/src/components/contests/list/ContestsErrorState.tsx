import { Button } from '@/components/ui/Button';

interface ContestsErrorStateProps {
  error: string;
}

export function ContestsErrorState({ error }: ContestsErrorStateProps) {
  return (
    <div className="text-center">
      <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
        <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">エラーが発生しました</h3>
      <p className="text-gray-500 mb-4">{error}</p>
      <Button onClick={() => window.location.reload()} className="bg-black text-white hover:bg-gray-800">
        再読み込み
      </Button>
    </div>
  );
} 