import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { createContest } from '@/services/contentestService';
import { Contest, CreateContestFormData } from '@/types/contest';
import { serverTimestamp } from 'firebase/firestore';

interface UseCreateContestReturn {
  formData: CreateContestFormData;
  currentStep: number;
  loading: boolean;
  error: string | null;
  updateFormData: (stepData: Partial<CreateContestFormData>) => void;
  setCurrentStep: (step: number) => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleSubmit: () => Promise<void>;
}

export function useCreateContest(): UseCreateContestReturn {
  const [formData, setFormData] = useState<CreateContestFormData>({
    title: '',
    description: '',
    requirements: '',
    prizePool: 0,
    prizeDistribution: [],
    startDate: '',
    endDate: '',
    category: '',
    thumbnail: null,
    resources: {
      images: [],
      videos: [],
      guidelines: ''
    }
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user, userBrand } = useAuth();
  const router = useRouter();

  const updateFormData = (stepData: Partial<CreateContestFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...stepData
    }));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!user || !userBrand) {
      setError('ユーザー情報またはブランド情報が見つかりません');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // TODO: ファイルアップロード処理を実装
      const thumbnailUrl = formData.thumbnail ? 'https://example.com/thumbnail.jpg' : '/images/default-contest.jpg';

      // Files を AssetItem に変換
      const assetItems = formData.resources.images.map(file => ({
        content: `https://example.com/uploads/${file.name}`, // TODO: 実際のアップロード後のURLに置き換え
        description: file.name
      }));

      const inspirationItems = formData.resources.videos.map(file => ({
        content: `https://example.com/uploads/${file.name}`, // TODO: 実際のアップロード後のURLに置き換え
        description: file.name
      }));

      const contestData: Omit<Contest, 'id'> = {
        brandId: userBrand.id,
        description: formData.description,
        requirements: formData.requirements,
        assets: assetItems,
        inspiration: inspirationItems,
        title: formData.title,
        category: formData.category,
        startDate: formData.startDate,
        endDate: formData.endDate,
        prizePool: formData.prizePool,
        prizeDistribution: formData.prizeDistribution,
        status: 'active',
        thumbnail: thumbnailUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const contestId = await createContest(contestData);
      
      // 作成成功後、コンテスト詳細ページまたは一覧ページにリダイレクト
      router.push(`/dashboard/contests/${contestId}`);
      
    } catch (err) {
      console.error('コンテスト作成エラー:', err);
      setError('コンテストの作成に失敗しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    currentStep,
    loading,
    error,
    updateFormData,
    setCurrentStep,
    handleNext,
    handlePrev,
    handleSubmit
  };
} 