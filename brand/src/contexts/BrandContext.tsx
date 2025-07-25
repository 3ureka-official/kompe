'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Brand } from '@/types/brand';
import { getSupabaseClient } from '@/lib/supabase';
import { getUserBrand } from '@/services/brandService';
import { AuthContext } from '@/contexts/AuthContext';

type BrandContextValue = {
  brand: Brand | null;
  loading: boolean;
};

export const BrandContext = createContext<BrandContextValue>({
  brand: null,
  loading: true,
});

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { profile, loading: userLoading } = useContext(AuthContext);

  useEffect(() => {
    if (!userLoading) {
      if (profile?.brand_id) {
        getUserBrand(profile.id).then((brand) => {
          console.log('brand', brand);
          setBrand(brand);
        });
      }
      setLoading(false);
    }
  }, [profile, userLoading]);

  return (
    <BrandContext.Provider value={{ brand, loading }}>
      {children}
    </BrandContext.Provider>
  );
} 