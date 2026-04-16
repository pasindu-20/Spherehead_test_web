import Head from "next/head";
import ServicesHeroSection from "@/components/services/services-hero-section";
import ServicesIntroSection from "@/components/services/services-intro-section";

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>Digital Services | Spherehead Technologies</title>
        <meta
          name="description"
          content="Transforming complex challenges into scalable digital realities."
        />
      </Head>

      {/* Main Page Wrapper */}
      <div className="relative overflow-x-hidden bg-[#f2f2f2]">
        {/* The Intro Section we built */}
        <ServicesHeroSection />
        <ServicesIntroSection />
        
        {/* <ServicesApproachSection /> */}
        {/* <ServicesProcessSteps /> */}
        {/* <ServicesGrid /> */}
        {/* <ServicesCTA /> */}
        
      </div>
    </>
  );
}