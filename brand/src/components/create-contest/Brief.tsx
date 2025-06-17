import { Button } from '@/components/ui/button';
import { RichTextEditor } from '../ui/RichTextEditer';

type Props = {
  onNext: () => void;
  onPrev: () => void;
};

export function Brief({ onNext, onPrev }: Props) {
  return (
    <div>
      <div className="bg-white rounded-lg p-8 shadow-sm">
        {/* Project Overview */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">プロジェクト概要</h3>
          
          <RichTextEditor value={''} onChange={() => {}} />
        </div>

        {/* Set rules */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">ルール設定</h3>
          
          <RichTextEditor value={''} onChange={() => {}} />
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6">
        <Button
          type="button"
          variant="secondary"
        >
          下書き保存
        </Button>
        <Button
          type="button"
          onClick={onPrev}
          variant="secondary"
        >
          前へ戻る
        </Button>
        <Button
          type="button"
          onClick={onNext}
          variant="primary"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#00E6D9';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#25F4EE';
          }}
        >
          次へ進む
        </Button>
      </div>
    </div>
  );
} 