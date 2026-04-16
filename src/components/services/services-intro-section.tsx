import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import SiteContainer from "@/components/layout/site-container";

export default function ServicesIntroSection() {
  const containerRef = useRef<HTMLElement>(null);

  // 1. PERFECTED SCROLL MATH
  // "start end" = Animation starts when the top of the white card touches the bottom of the screen
  // "start start" = Animation finishes EXACTLY when the white card snaps to the top of the screen
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"] 
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.5
  });

  // 2. COLUMN TIMING (Staggered to form the stairs)
  // They all reliably hit 0% (fully up) by the time the auto-scroll finishes snapping
  const col1Y = useTransform(smoothProgress, [0, 0.6], ["100%", "0%"]);
  const col2Y = useTransform(smoothProgress, [0.2, 0.8], ["100%", "0%"]);
  const col3Y = useTransform(smoothProgress, [0.4, 1.0], ["100%", "0%"]);

  // 3. CONTENT TIMING (Waits for the white background!)
  // The text won't appear until its specific white column is safely behind it
  const content1Opacity = useTransform(smoothProgress, [0.4, 0.65], [0, 1]);
  const content1Y = useTransform(smoothProgress, [0.4, 0.65], [30, 0]);

  const content2Opacity = useTransform(smoothProgress, [0.6, 0.85], [0, 1]);
  const content2Y = useTransform(smoothProgress, [0.6, 0.85], [30, 0]);

  const content3Opacity = useTransform(smoothProgress, [0.8, 1.0], [0, 1]);
  const content3Y = useTransform(smoothProgress, [0.8, 1.0], [30, 0]);

  return (
    <section 
      ref={containerRef} 
      // ADDED: min-h-[100svh] flex flex-col justify-center
      // This forces the section to be exactly one full screen tall, eliminating weird blue gaps!
      className="relative w-full max-w-full h-[100svh] flex flex-col justify-center overflow-hidden rounded-t-[20px] rounded-b-[20px] md:rounded-t-[30px] md:rounded-b-[30px] shadow-xl">
      {/* BACKGROUND LAYER: The 3 Vertical White Columns */}
      <div className="absolute inset-0 z-0 flex w-full h-full">
        <motion.div style={{ y: col1Y }} className="w-1/3 h-full bg-white" />
        <motion.div style={{ y: col2Y }} className="w-1/3 h-full bg-white" />
        <motion.div style={{ y: col3Y }} className="w-1/3 h-full bg-white" />
      </div>

      {/* CONTENT LAYER */}
      <SiteContainer className="relative z-10 flex flex-col py-16 md:py-20 lg:py-24">
        
        {/* Top Text (Fades in with Column 1) */}
        <motion.div style={{ opacity: content1Opacity, y: content1Y }} className="w-full max-w-[1100px]">
          <p className="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[48px] xl:text-[52px] font-light leading-[1.2] tracking-tight text-[#01030B]">
            With a passionate team driving <span className="text-[#2666d2] font-normal">innovation</span>, Spherehead 
            delivers cutting-edge <span className="text-[#2666d2] font-normal">digital services</span> that help brands grow, 
            adapt, and stand out in <span className="text-[#2666d2] font-normal">today’s competitive</span> landscape.
          </p>
        </motion.div>

        {/* Horizontal Line Divider (Fades in with Column 2) */}
        <motion.div style={{ opacity: content2Opacity, y: content2Y }} className="w-full h-[1px] bg-gray-200 my-8 lg:my-12" />

        {/* Bottom Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[3.5fr_6.5fr] gap-8 lg:gap-14 items-center w-full">
          
          {/* Left Side: Image (Fades in with Column 1 & 2) */}
          <motion.div style={{ opacity: content2Opacity, y: content2Y }} className="relative w-full aspect-square max-w-[320px] lg:max-w-none bg-[#184aa3] overflow-hidden mx-auto lg:mx-0 rounded-xl">
            <Image 
              src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776313260/Services_y83dyy.png" 
              alt="Abstract 3D rings representing digital innovation"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Right Side: Text (Fades in with Column 3) */}
          <motion.div style={{ opacity: content3Opacity, y: content3Y }} className="flex flex-col gap-6 lg:gap-10 w-full">
            <p className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-medium leading-[1.5] text-[#01030B]">
              We focus on creating meaningful digital experiences that connect your business with real growth, 
              because that’s where true transformation begins and lasting success is achieved.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 text-[#888888]">
              <p className="font-light leading-[1.7] text-[14px] sm:text-[15px]">
                Our approach begins by understanding what makes your business unique—your vision, your goals, 
                and your competitive edge. We explore how your digital presence can better serve your audience 
                by aligning technology with real user needs, behaviors, and expectations.
              </p>
              <p className="font-light leading-[1.7] text-[14px] sm:text-[15px]">
                The real impact happens when strategy and execution come together. We shape solutions that 
                enhance performance, improve efficiency, and elevate your brand experience—creating a strong 
                digital foundation that drives growth and delivers long-term value.
              </p>
            </div>
          </motion.div>

        </div>
      </SiteContainer>
    </section>
  );
}