'use client';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
  color?: string;
}

interface ContestFilterProps {
  options: FilterOption[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
}

// フィルタータイプに応じた色を取得する関数
const getFilterColors = (filterId: string) => {
  switch (filterId) {
    case 'all':
      return {
        bg: 'bg-gray-900',
        text: 'text-white'
      };
    case 'active':
      return {
        bg: 'bg-green-100',
        text: 'text-green-700'
      };
    case 'draft':
      return {
        bg: 'bg-yellow-100',
        text: 'text-yellow-700'
      };
    case 'ready':
      return {
        bg: 'bg-blue-100',
        text: 'text-blue-700'
      };
    case 'ended':
      return {
        bg: 'bg-red-100',
        text: 'text-red-700'
      };
    default:
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-700'
      };
  }
};

export function ContestFilter({ options, activeFilter, onFilterChange }: ContestFilterProps) {
  return (
    <div className="flex gap-1 p-1 rounded-lg">
      {options.map((filter) => {
        const colors = getFilterColors(filter.id);
        return (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${
                activeFilter === filter.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }
            `}
          >
            <span className="flex items-center gap-2">
              {filter.label}
              {filter.count !== undefined && (
                <span className={`px-2 py-1 rounded-sm text-xs font-medium ${colors.bg} ${colors.text}`}>
                  {filter.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
} 