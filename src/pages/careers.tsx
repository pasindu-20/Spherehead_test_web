import { useEffect, useRef } from "react";
import { useScrollContainerContext } from "@/context/ScrollContainerContext";
import CareersHero from "@/components/careers/careers-hero";
import OurCulture from "@/components/careers/careers-our-culture";
import StayConnected from "@/components/careers/careers-stay-connected";
import InternshipPrograms from "@/components/careers/careers-internship-programs";
import Footer from "@/components/layout/footer";

export default function CareersPage() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { setScrollContainerRef } = useScrollContainerContext();

  useEffect(() => {
    // We attach the ref universally; the scroll context will use it if needed.
    // CSS handles making this container the scroll area on desktop.
    setScrollContainerRef(scrollContainerRef);
    return () => {
      setScrollContainerRef(null);
    };
  }, [scrollContainerRef, setScrollContainerRef]);

  return (
    <main
      ref={scrollContainerRef}
      className="w-full max-lg:overflow-x-hidden lg:h-screen lg:overflow-y-auto"
    >
      <CareersHero />

      <div className="w-full text-[#01030B] z-10 relative">
        <OurCulture />
      </div>

      <StayConnected />
      <InternshipPrograms />
      <div className="lg:w-full lg:shrink-0 lg:snap-start">
        <Footer />
      </div>
    </main>
  );
}