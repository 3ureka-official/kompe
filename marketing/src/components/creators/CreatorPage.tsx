import { CreatorHero } from "@/components/creators/CreatorHero";
import { CreatorProblemSection } from "@/components/creators/CreatorProblemSection";
import { CreatorSolutionSection } from "@/components/creators/CreatorSolutionSection";
import { CreatorHowItWorks } from "@/components/creators/CreatorHowItWorks";
import { CreatorFAQ } from "@/components/creators/CreatorFAQ";
import { CreatorFinalCTA } from "@/components/creators/CreatorFinalCTA";
import { CreatorTopCTA } from "@/components/creators/CreatorTopCTA";
import Image from "next/image";
import Link from "next/link";

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
          quality={100}
          className="w-[30vw] md:w-[25vw] xl:w-[160px]"
        />
      </span>

      {/* 企業様はこちらリンク */}
      <Link
        href="/contact/brand"
        className="fixed top-[2.2vw] right-[4.5vw] z-200 text-xs md:text-md xl:text-lg bg-[#042f45] text-white px-4 py-2"
      >
        <span className="text-white font-bold">企業様はこちら</span>
      </Link>

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
