import { BrandProvider } from '@/contexts/BrandContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BrandProvider>
      <div className="w-full">
        {children}
      </div>
    </BrandProvider>
  );
} 