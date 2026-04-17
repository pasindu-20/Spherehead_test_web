import Head from "next/head";
import useAutoScroll from "@/hooks/useAutoScroll";
import ServicesHeroSection from "@/components/services/services-hero-section";
import ServicesIntroSection from "@/components/services/services-intro-section";
import ServicesApproachSection from "@/components/services/services-approach-section";
import ServicesListSection from "@/components/services/services-list-section";

export default function ServicesPage() {
  useAutoScroll();

  return (
    <>
      <Head>
        <title>Digital Services | Spherehead Technologies</title>
      </Head>

      <div className="site-background-root relative w-full min-h-screen">
        <div className="site-background-content flex flex-col relative z-0">
          
          {/* CRITICAL FIX 1: Freeze the Hero Section behind the rest of the page! */}
          <div className="sticky top-0 w-full h-[100vh] -z-10">
            <ServicesHeroSection />
          </div>
          
          {/* The rest of the page now slides UP over the frozen Hero gradient */}
          <div className="w-full flex flex-col relative z-10">
            <ServicesIntroSection />
            <ServicesApproachSection />
            <ServicesListSection />
          </div>

        </div>
      </div>
    </>
  );
}