import { CreatorHero } from "@/components/creators/CreatorHero";
import { CreatorProblemSection } from "@/components/creators/CreatorProblemSection";
import { CreatorSolutionSection } from "@/components/creators/CreatorSolutionSection";
import { CreatorHowItWorks } from "@/components/creators/CreatorHowItWorks";
import { CreatorFAQ } from "@/components/creators/CreatorFAQ";
import { CreatorFinalCTA } from "@/components/creators/CreatorFinalCTA";
import { CreatorTopCTA } from "@/components/creators/CreatorTopCTA";

export default function CreatorsPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CreatorHero />
      <CreatorTopCTA />
      <CreatorProblemSection />
      <CreatorSolutionSection />
      <CreatorHowItWorks />
      <CreatorFinalCTA />
      <CreatorFAQ />
    </div>
  );
}
