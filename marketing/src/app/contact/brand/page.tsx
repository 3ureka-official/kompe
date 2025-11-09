import { BrandContactCard } from "@/components/contact/BrandContactCard";
import { Header } from "@/components/Header";

export default function BrandContactPage() {
  return (
    <div className="flex flex-col pt-10">
      <Header />
      <BrandContactCard />
    </div>
  );
}
