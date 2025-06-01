import { Button } from '@/components/ui/button';

const criteria = [
  { id: 'views', label: '再生回数', description: '動画の総再生回数で評価' },
  { id: 'likes', label: 'いいね数', description: '獲得したいいね数で評価' },
  { id: 'brand', label: 'ブランド審査', description: '担当者による主観的な評価' },
];

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
          
          {/* Toolbar */}
          <div className="border border-gray-300 rounded-t-md bg-gray-50 px-3 py-2 flex items-center gap-2">
            <select className="text-sm border-none bg-transparent focus:outline-none">
              <option>段落</option>
              <option>見出し 1</option>
              <option>見出し 2</option>
              <option>見出し 3</option>
            </select>
            <div className="w-px h-4 bg-gray-300 mx-1"></div>
            <button className="p-1 hover:bg-gray-200 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-1 hover:bg-gray-200 rounded font-bold">B</button>
            <button className="p-1 hover:bg-gray-200 rounded italic">I</button>
            <button className="p-1 hover:bg-gray-200 rounded underline">U</button>
            <button className="p-1 hover:bg-gray-200 rounded line-through">S</button>
            <div className="w-px h-4 bg-gray-300 mx-1"></div>
            <button className="p-1 hover:bg-gray-200 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="w-px h-4 bg-gray-300 mx-1"></div>
            <button className="p-1 hover:bg-gray-200 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="w-px h-4 bg-gray-300 mx-1"></div>
            <button className="p-1 hover:bg-gray-200 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="ml-auto flex items-center gap-2">
              <button className="p-1 hover:bg-gray-200 rounded">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-1 hover:bg-gray-200 rounded">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-1 hover:bg-gray-200 rounded">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Editor Content */}
          <div 
            className="border border-gray-300 border-t-0 rounded-b-md p-4 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            contentEditable
            suppressContentEditableWarning={true}
            style={{ minHeight: '200px' }}
          >
            <p className="text-gray-400 m-0">素晴らしい内容を書いてください...</p>
          </div>
        </div>

        {/* Set rules */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">ルール設定</h3>
          
          {/* Toolbar */}
          <div className="border border-gray-300 rounded-t-md bg-gray-50 px-3 py-2 flex items-center gap-2">
            <select className="text-sm border-none bg-transparent focus:outline-none">
              <option>段落</option>
              <option>見出し 1</option>
              <option>見出し 2</option>
              <option>見出し 3</option>
            </select>
            <div className="w-px h-4 bg-gray-300 mx-1"></div>
            <button className="p-1 hover:bg-gray-200 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-1 hover:bg-gray-200 rounded font-bold">B</button>
            <button className="p-1 hover:bg-gray-200 rounded italic">I</button>
            <button className="p-1 hover:bg-gray-200 rounded underline">U</button>
            <button className="p-1 hover:bg-gray-200 rounded line-through">S</button>
            <div className="w-px h-4 bg-gray-300 mx-1"></div>
            <button className="p-1 hover:bg-gray-200 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="w-px h-4 bg-gray-300 mx-1"></div>
            <button className="p-1 hover:bg-gray-200 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="w-px h-4 bg-gray-300 mx-1"></div>
            <button className="p-1 hover:bg-gray-200 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="ml-auto flex items-center gap-2">
              <button className="p-1 hover:bg-gray-200 rounded">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-1 hover:bg-gray-200 rounded">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-1 hover:bg-gray-200 rounded">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Editor Content */}
          <div 
            className="border border-gray-300 border-t-0 rounded-b-md p-4 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            contentEditable
            suppressContentEditableWarning={true}
            style={{ minHeight: '200px' }}
          >
            <p className="text-gray-400 m-0">素晴らしい内容を書いてください...</p>
          </div>
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