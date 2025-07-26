import { useMutation } from '@tanstack/react-query';
import { createBrand } from '@/services/brandService';
import { Brand } from '@/types/Brand';
import { useRouter } from 'next/navigation';

export function useCreateBrand() {
    return useMutation({
      mutationFn: ({ userId, brandData }: { 
        userId: string; 
        brandData: Omit<Brand, 'id' | 'created_at'>
      }) => createBrand(userId, brandData),

      onError: (error: Error) => {
        alert(`ブランド作成に失敗しました：${error.message}`);
      },
    });
  }