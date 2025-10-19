import { CreatorHero } from "@/components/creators/CreatorHero";
import { CreatorProblemSection } from "@/components/creators/CreatorProblemSection";
import { CreatorSolutionSection } from "@/components/creators/CreatorSolutionSection";
import { CreatorHowItWorks } from "@/components/creators/CreatorHowItWorks";
import { CreatorFAQ } from "@/components/creators/CreatorFAQ";
import { CreatorFinalCTA } from "@/components/creators/CreatorFinalCTA";
import { CreatorTopCTA } from "@/components/creators/CreatorTopCTA";
import Image from "next/image";

export default function CreatorsPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <span
        style={{ position: "fixed", top: "2.5vw", left: "4.5vw", zIndex: 200 }}
      >
        <Image
          src="/images/logo/logo-coloredhdpi.png"
          alt="Creator Hero"
          width={0}
          height={0}
          sizes="100%"
          className="w-[25vw] xl:w-[160px]"
        />
      </span>
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
