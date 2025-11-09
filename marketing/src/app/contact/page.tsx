import { ContactCard } from "@/components/contact/ContactCard";
import { Header } from "@/components/Header";

export default function ContactPage() {
  return (
    <div className="flex flex-col pt-10">
      <Header />
      <ContactCard />
    </div>
  );
}
