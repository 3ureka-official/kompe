import { Header } from '@/components/Header';
import { Hero } from '@/components/kompe-contest/Hero';
import { ServiceOverview } from '@/components/kompe-contest/ServiceOverview';
import { CampaignDetails } from '@/components/kompe-contest/CampaignDetails';
import { ApplicationSteps } from '@/components/kompe-contest/ApplicationSteps';
import { FloatingButton } from '@/components/kompe-contest/FloatingButton';

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
      <FloatingButton />
    </div>
  );
}
