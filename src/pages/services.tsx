import Head from "next/head";
import useAutoScroll from "@/hooks/useAutoScroll";
import ServicesHeroSection from "@/components/services/services-hero-section";
import ServicesIntroSection from "@/components/services/services-intro-section";
import ServicesApproachSection from "@/components/services/services-approach-section";

export default function ServicesPage() {
  
  // This single line triggers all the scrolling logic!
  useAutoScroll();

  return (
    <>
      <Head>
        <title>Digital Services | Spherehead Technologies</title>
        <meta name="description" content="Transforming complex challenges into scalable digital realities." />
      </Head>

      <div className="site-background-root">
        <div className="site-background-fixed" />
        <div className="site-background-content flex flex-col pb-20">
          
          {/* Section 1: Top Blue Hero */}
          <ServicesHeroSection />
          
          {/* Wrapper to ensure no visual gaps between the White Card and Approach Section */}
          <div className="w-full flex flex-col">
            {/* Section 2: White Curvy Cards */}
            <ServicesIntroSection />
            
            {/* Section 3: Horizontal Scroll */}
            <ServicesApproachSection />
          </div>

        </div>
      </div>
    </>
  );
}