import IndustriesHero from "@/components/industries/industries-hero";
import IndustriesIntro from "@/components/industries/industries-intro";
import IndustriesList from "@/components/industries/industries-list";
import DesignStack from "@/components/industries/industries-design-stack";
import TechScrollSection from "@/components/industries/industries-advanced-technologies";
import Footer from "@/components/layout/footer";

export default function IndustriesPage() {
  return (
    <main className="w-full max-lg:overflow-x-hidden">
      <IndustriesHero />
      <IndustriesIntro />
      <IndustriesList />
      <DesignStack />
      <TechScrollSection />
      <Footer />
    </main>
  );
}