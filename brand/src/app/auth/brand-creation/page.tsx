'use client';

import { AuthGuard } from '@/components/auth/AuthGuard';
import { BrandCreationForm } from '@/components/brand/BrandCreationForm';

export default function BrandCreationPage() {
  return (
    <AuthGuard>
      <BrandCreationForm />
    </AuthGuard>
  );
} 