import { Sidebar } from '@/components/dashboard/Sidebar';
import { BrandProvider } from '@/contexts/BrandContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BrandProvider>
      <div className="flex bg-gray-50">
        <Sidebar />
          <div className="p-8 w-full">
            {children}
          </div>
      </div>
    </BrandProvider>
  );
} 