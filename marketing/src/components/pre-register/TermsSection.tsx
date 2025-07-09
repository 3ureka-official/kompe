interface TermsSectionProps {
  formData?: {
    hasReadTerms?: boolean;
    hasReadPrivacy?: boolean;
  };
  errors?: { [key: string]: string };
  updateFormData?: (updates: any) => void;
}

export function TermsSection({ formData, errors, updateFormData }: TermsSectionProps) {
  if (formData && updateFormData) {
    // For forms with detailed state management
    return (
      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
        <label className="flex items-start">
          <input
            type="checkbox"
            checked={formData.hasReadTerms || false}
            onChange={(e) => updateFormData({ hasReadTerms: e.target.checked })}
            className="w-4 h-4 text-[#FE2C55] border-gray-300 rounded focus:ring-[#FE2C55] mt-1"
          />
          <span className="ml-3 text-sm text-gray-700">
            <a href="/terms" target="_blank" className="text-[#FE2C55] hover:underline">利用規約</a>に同意します <span className="text-red-500">*</span>
          </span>
        </label>
        {errors?.hasReadTerms && <p className="text-red-500 text-sm">{errors.hasReadTerms}</p>}
        
        <label className="flex items-start">
          <input
            type="checkbox"
            checked={formData.hasReadPrivacy || false}
            onChange={(e) => updateFormData({ hasReadPrivacy: e.target.checked })}
            className="w-4 h-4 text-[#FE2C55] border-gray-300 rounded focus:ring-[#FE2C55] mt-1"
          />
          <span className="ml-3 text-sm text-gray-700">
            <a href="/privacy" target="_blank" className="text-[#FE2C55] hover:underline">プライバシーポリシー</a>に同意します <span className="text-red-500">*</span>
          </span>
        </label>
        {errors?.hasReadPrivacy && <p className="text-red-500 text-sm">{errors.hasReadPrivacy}</p>}
      </div>
    );
  }

  // Simple required checkbox for other forms
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <label className="flex items-start">
        <input
          type="checkbox"
          required
          className="w-4 h-4 text-[#FE2C55] border-gray-300 rounded focus:ring-[#FE2C55] mt-1"
        />
        <span className="ml-3 text-sm text-gray-700">
          <a href="/terms" target="_blank" className="text-[#FE2C55] hover:underline">利用規約</a>および
          <a href="/privacy" target="_blank" className="text-[#FE2C55] hover:underline">プライバシーポリシー</a>に同意します <span className="text-red-500">*</span>
        </span>
      </label>
    </div>
  );
} 