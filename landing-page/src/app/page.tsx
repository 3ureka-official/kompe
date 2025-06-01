import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ServiceOverview } from '@/components/ServiceOverview';
import { CampaignDetails } from '@/components/CampaignDetails';
import { ApplicationSteps } from '@/components/ApplicationSteps';
import { Footer } from '@/components/Footer';
import { FloatingButton } from '@/components/FloatingButton';

export default function CreatorLandingPage() {
  return (
    <div className="min-h-screen text-text bg-background font-sans overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <ServiceOverview />
        <CampaignDetails />
        <ApplicationSteps />
      </main>
      <Footer />
      <FloatingButton />
    </div>
  );
}
