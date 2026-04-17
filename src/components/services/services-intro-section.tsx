import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion"; // or "motion/react"
import SiteContainer from "@/components/layout/site-container";

export default function ServicesIntroSection() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"] 
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100, damping: 20, mass: 0.5
  });

  // FASTER COLUMNS
  const col1Y = useTransform(smoothProgress, [0, 0.4], ["100%", "0%"]);
  const col2Y = useTransform(smoothProgress, [0.1, 0.5], ["100%", "0%"]);
  const col3Y = useTransform(smoothProgress, [0.2, 0.6], ["100%", "0%"]);

  // SEQUENTIAL CONTENT
  const content1Opacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
  const content1Y = useTransform(smoothProgress, [0.3, 0.5], [30, 0]);
  
  const content2Opacity = useTransform(smoothProgress, [0.5, 0.7], [0, 1]);
  const content2Y = useTransform(smoothProgress, [0.5, 0.7], [30, 0]);
  
  const content3Opacity = useTransform(smoothProgress, [0.7, 0.9], [0, 1]);
  const content3Y = useTransform(smoothProgress, [0.7, 0.9], [30, 0]);

  return (
    <section 
      ref={containerRef} 
      // FIX 1: Strictly h-[100vh] so the JS scroll hook math works perfectly going up AND down.
      // FIX 2: REMOVED snap-start and snap-always to prevent conflict with your custom scroll script.
      className="relative z-30 isolate w-full max-w-full h-[100vh] flex flex-col justify-center overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
    >
      {/* LAYER 1: The White Columns */}
      <div className="absolute inset-0 flex w-full h-full pointer-events-none">
        <motion.div style={{ y: col1Y }} className="w-1/3 h-full bg-white" />
        <motion.div style={{ y: col2Y }} className="w-1/3 h-full bg-white" />
        <motion.div style={{ y: col3Y }} className="w-1/3 h-full bg-white" />
      </div>

      {/* LAYER 2: Content 
          FIX 3: Adjusted py-20 down to py-8/py-12 to ensure everything fits perfectly inside 100vh 
      */}
      <SiteContainer className="relative flex flex-col py-8 lg:py-12">
        
        <motion.div style={{ opacity: content1Opacity, y: content1Y }} className="w-full max-w-[1100px]">
          {/* Slightly tightened leading/text size on smaller screens to ensure it doesn't crop */}
          <p className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] xl:text-[52px] font-light leading-[1.15] tracking-tight text-[#01030B]">
            With a passionate team driving <span className="text-[#2666d2] font-normal">innovation</span>, Spherehead 
            delivers cutting-edge <span className="text-[#2666d2] font-normal">digital services</span> that help brands grow, 
            adapt, and stand out in <span className="text-[#2666d2] font-normal">today’s competitive</span> landscape.
          </p>
        </motion.div>

        {/* Reduced margin from my-12 to my-6/my-10 */}
        <motion.div style={{ opacity: content2Opacity, y: content2Y }} className="w-full h-[1px] bg-gray-200 my-6 lg:my-10" />

        <div className="grid grid-cols-1 lg:grid-cols-[3.5fr_6.5fr] gap-6 lg:gap-12 items-center w-full">
          
          <div className="relative w-full aspect-square max-w-[260px] lg:max-w-none mx-auto lg:mx-0">
            
            {/* THE HOLE PUNCH */}
            <div className="absolute inset-0 bg-black [mix-blend-mode:destination-out]" />
            
            {/* THE IMAGE */}
            <motion.div style={{ opacity: content2Opacity, y: content2Y }} className="absolute inset-0 z-10">
              <Image 
                src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776313260/Services_y83dyy.png" 
                alt="Abstract 3D rings"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </motion.div>

          </div>

          <motion.div style={{ opacity: content3Opacity, y: content3Y }} className="flex flex-col gap-4 lg:gap-8 w-full">
            <p className="text-[17px] sm:text-[18px] md:text-[22px] lg:text-[24px] font-medium leading-[1.4] text-[#01030B]">
              We focus on creating meaningful digital experiences that connect your business with real growth, 
              because that’s where true transformation begins and lasting success is achieved.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 text-[#888888]">
              <p className="font-light leading-[1.6] text-[14px] sm:text-[15px]">
                Our approach begins by understanding what makes your business unique—your vision, your goals, 
                and your competitive edge. We explore how your digital presence can better serve your audience.
              </p>
              <p className="font-light leading-[1.6] text-[14px] sm:text-[15px]">
                The real impact happens when strategy and execution come together. We shape solutions that 
                enhance performance, improve efficiency, and elevate your brand experience.
              </p>
            </div>
          </motion.div>

        </div>
      </SiteContainer>
    </section>
  );
}