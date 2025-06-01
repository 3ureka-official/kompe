import { FeaturesHeader } from '@/components/features/FeaturesHeader';
import { LaunchContestSection } from '@/components/features/LaunchContestSection';
// import { TrustedCompaniesSection } from '@/components/features/TrustedCompaniesSection';
import { HowItWorksSection } from '@/components/features/HowItWorksSection';
// import { CreatorShowcaseSection } from '@/components/features/CreatorShowcaseSection';
import { FaqSection } from '@/components/features/FaqSection';
// import { FooterSection } from '@/components/features/FooterSection';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <FeaturesHeader />
      <LaunchContestSection />
      {/* <TrustedCompaniesSection /> */}
      <HowItWorksSection />
      {/* <CreatorShowcaseSection /> */}
      <FaqSection />
      {/* <FooterSection /> */}
    </div>
  );
} 