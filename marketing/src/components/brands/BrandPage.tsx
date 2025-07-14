import { BrandHero } from '@/components/brands/BrandHero';
// import { BrandProblemSection } from '@/components/brands/BrandProblemSection';
import { BrandSolutionSection } from '@/components/brands/BrandSolutionSection';
// import { BrandCaseStudies } from '@/components/brands/BrandCaseStudies';
import { BrandServiceFlow } from '@/components/brands/BrandServiceFlow';
// import { BrandPricing } from '@/components/brands/BrandPricing';
import { BrandFAQ } from '@/components/brands/BrandFAQ';
import { BrandCTA } from '@/components/brands/BrandCTA';

export default function BrandsPage() {
  return (
    <div className="min-h-screen">
      <BrandHero />
      {/* <BrandProblemSection /> */} 
      <BrandSolutionSection />
      {/* <BrandCaseStudies /> */}
      <BrandServiceFlow />
      {/* <BrandPricing /> */}
      <BrandFAQ />
      <BrandCTA />
    </div>
  );
}