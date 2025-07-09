import { CreatorHero } from '@/components/creators/CreatorHero';
import { CreatorProblemSection } from '@/components/creators/CreatorProblemSection';
import { CreatorSolutionSection } from '@/components/creators/CreatorSolutionSection';
import { CreatorHowItWorks } from '@/components/creators/CreatorHowItWorks';
// import { CreatorCredibilitySection } from '@/components/creators/CreatorCredibilitySection';
import { CreatorCurrentContests } from '@/components/creators/CreatorCurrentContests';
import { CreatorFAQ } from '@/components/creators/CreatorFAQ';
import { CreatorFinalCTA } from '@/components/creators/CreatorFinalCTA';

export default function CreatorsPage() {
  return (
    <div className="min-h-screen">
      <CreatorHero />
      <CreatorProblemSection />
      <CreatorSolutionSection />
      <CreatorHowItWorks />
      {/* <CreatorCredibilitySection /> */}
      {/* <CreatorCurrentContests /> */}
      <CreatorFAQ />
      <CreatorFinalCTA />
    </div>
  );
}