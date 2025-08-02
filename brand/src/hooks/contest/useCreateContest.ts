import { useMutation } from '@tanstack/react-query';
import { createContest } from '@/services/contentestService';
import { Contest, FormAssetItem, InspirationItem } from '@/types/Contest';

export function useCreateContest() {
    return useMutation({
      mutationFn: ({ brandId, contestData, thumbnailFile, assetsData, inspirationData }: { 
        brandId: string; 
        contestData: Omit<Contest, 'id' | 'created_at' | 'status' | 'brandId' | 'thumbnail_url'>;
        thumbnailFile: File | null;
        assetsData: FormAssetItem[] | null;
        inspirationData: Omit<InspirationItem, 'id' | 'created_at' | 'brand_id' | 'contest_id'>[] | null;
      }) => createContest(brandId, contestData, thumbnailFile, assetsData, inspirationData),

      onError: (error: Error) => {
        alert(`コンテスト作成に失敗しました：${error.message}`);
      },
    });
  }