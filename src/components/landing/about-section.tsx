"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SiteContainer from "@/components/layout/site-container";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // 1) card slowly moves upward
  const cardY = useTransform(scrollYProgress, [0, 0.45], ["88vh", "0vh"]);

  // 2) after moving up, width expands to full screen
  const cardWidth = useTransform(
    scrollYProgress,
    [0.3, 0.75],
    ["100%", "100vw"]
  );

  // keep radius same at start, then soften when expanded
  const cardRadius = useTransform(scrollYProgress, [0.3, 0.75], ["4px", "0px"]);

  const shadow = useTransform(
    scrollYProgress,
    [0, 0.75],
    ["0 0 0 rgba(0,0,0,0)", "0 18px 60px rgba(0,0,0,0.14)"]
  );

  return (
    <section ref={sectionRef} className="relative h-screen">
      <div className="sticky top-0 h-screen overflow-hidden">
        <SiteContainer className="relative h-full overflow-visible">
          <motion.div
            style={{
              y: cardY,
              width: cardWidth,
              boxShadow: shadow,
              borderTopLeftRadius: cardRadius,
              borderTopRightRadius: cardRadius,
              borderBottomLeftRadius: cardRadius,
              borderBottomRightRadius: cardRadius,
            }}
            className="absolute left-1/2 top-0 h-screen -translate-x-1/2 bg-[#f2f2f2]"
          />
        </SiteContainer>
      </div>
    </section>
  );
}