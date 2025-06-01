import { AuthGuard } from '@/components/auth/AuthGuard';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requireAuth={true} requireBrand={true}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 ml-45 overflow-y-auto">
          <Header />
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
} 