import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import SiteContainer from "@/components/layout/site-container";

export default function ServicesApproachSection() {
  const targetRef = useRef<HTMLElement>(null);

  // 1. Track the scroll progress of this specific 200vh section
  // "start start" = Animation begins when the top of the section hits the top of the screen
  // "end end" = Animation ends when the bottom of the section hits the bottom of the screen
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // 2. Smooth out the scrolling so it feels premium
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.5
  });

  // 3. Map the vertical scroll to horizontal movement
  // We move the inner track from 0% to -50% (which reveals the second half of the track)
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);

  return (
    // h-[200vh] gives us exactly 1 extra screen of scrolling distance to trigger the horizontal slide
    <section ref={targetRef} className="relative w-full h-[200vh] bg-transparent text-white">
      
      {/* The sticky container locks to the screen while you scroll through the 200vh height */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center overflow-hidden">
        <SiteContainer className="flex flex-col gap-16 lg:gap-24">
          
          {/* Top: Label + Heading (Fades in when it enters the screen) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col"
          >
            {/* Label with 3-dot icon */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex items-center justify-center w-5 h-5">
                <div className="absolute w-2 h-2 rounded-full bg-[#92D9FF] top-0 left-0" />
                <div className="absolute w-2 h-2 rounded-full bg-[#FD7624] bottom-0 left-0" />
                <div className="absolute w-2 h-2 rounded-full bg-white right-0 top-1.5" />
              </div>
              <span className="text-[14px] md:text-[15px] tracking-[0.1em] text-white/90 uppercase font-bold">
                Strategic Approach
              </span>
            </div>
            
            <h2 className="text-[36px] md:text-[48px] lg:text-[56px] font-light leading-[1.2] max-w-[900px]">
              Powering Business Transformation through Precision Engineering
            </h2>
          </motion.div>

          {/* Bottom: Horizontal Scrolling Track */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative w-full overflow-hidden"
          >
            {/* The Track: 200% width so it can hold two panels side-by-side */}
            <motion.div style={{ x }} className="flex w-[200%] gap-0">
              
              {/* PANEL 1: Columns 01, 02, 03 (Takes up exactly half the track width) */}
              <div className="w-1/2 shrink-0 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
                <div className="flex flex-col gap-4 md:pr-8 lg:pr-12 md:border-r border-white/20">
                  <span className="text-[48px] lg:text-[64px] font-light text-white/90 leading-none mb-2">01</span>
                  <h3 className="text-[22px] lg:text-[26px] font-normal leading-[1.3]">
                    Expertise in Latest<br/>Tech Stacks
                  </h3>
                  <p className="text-[14px] lg:text-[15px] text-white/70 leading-[1.7] mt-4 max-w-[320px]">
                    Harnessing the power of the latest technologies to create future-ready solutions that elevate your business.
                  </p>
                </div>

                <div className="flex flex-col gap-4 md:px-8 lg:px-12 md:border-r border-white/20">
                  <span className="text-[48px] lg:text-[64px] font-light text-white/90 leading-none mb-2">02</span>
                  <h3 className="text-[22px] lg:text-[26px] font-normal leading-[1.3]">
                    Agile and Rapid<br/>Development
                  </h3>
                  <p className="text-[14px] lg:text-[15px] text-white/70 leading-[1.7] mt-4 max-w-[320px]">
                    Delivering faster, adaptable solutions that evolve with your needs, ensuring quick turnarounds without sacrificing quality.
                  </p>
                </div>

                <div className="flex flex-col gap-4 md:pl-8 lg:pl-12">
                  <span className="text-[48px] lg:text-[64px] font-light text-white/90 leading-none mb-2">03</span>
                  <h3 className="text-[22px] lg:text-[26px] font-normal leading-[1.3]">
                    Seamless<br/>Integration
                  </h3>
                  <p className="text-[14px] lg:text-[15px] text-white/70 leading-[1.7] mt-4 max-w-[320px]">
                    Ensuring smooth integration with your existing systems for efficient workflows and uninterrupted operations.
                  </p>
                </div>
              </div>

              {/* PANEL 2: Columns 04, 05, 06 (Takes up the other half of the track width) */}
              <div className="w-1/2 shrink-0 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
                <div className="flex flex-col gap-4 md:pr-8 lg:pr-12 md:border-r border-white/20">
                  <span className="text-[48px] lg:text-[64px] font-light text-white/90 leading-none mb-2">04</span>
                  <h3 className="text-[22px] lg:text-[26px] font-normal leading-[1.3]">
                    Human-Centered<br/>Innovation
                  </h3>
                  <p className="text-[14px] lg:text-[15px] text-white/70 leading-[1.7] mt-4 max-w-[320px]">
                    Focusing on user experience to design solutions that are intuitive, impactful, and designed with real people in mind.
                  </p>
                </div>

                <div className="flex flex-col gap-4 md:px-8 lg:px-12 md:border-r border-white/20">
                  <span className="text-[48px] lg:text-[64px] font-light text-white/90 leading-none mb-2">05</span>
                  <h3 className="text-[22px] lg:text-[26px] font-normal leading-[1.3]">
                    Reliable & Secure<br/>Development
                  </h3>
                  <p className="text-[14px] lg:text-[15px] text-white/70 leading-[1.7] mt-4 max-w-[320px]">
                    Building dependable, secure solutions that safeguard your business and provide peace of mind.
                  </p>
                </div>

                <div className="flex flex-col gap-4 md:pl-8 lg:pl-12">
                  <span className="text-[48px] lg:text-[64px] font-light text-white/90 leading-none mb-2">06</span>
                  <h3 className="text-[22px] lg:text-[26px] font-normal leading-[1.3]">
                    Code Quality and<br/>Version Control
                  </h3>
                  <p className="text-[14px] lg:text-[15px] text-white/70 leading-[1.7] mt-4 max-w-[320px]">
                    Maintaining code quality with robust version control to ensure scalability, reliability, and smooth collaboration.
                  </p>
                </div>
              </div>

            </motion.div>
          </motion.div>

        </SiteContainer>
      </div>
    </section>
  );
}