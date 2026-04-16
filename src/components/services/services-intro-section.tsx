import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import SiteContainer from "@/components/layout/site-container";

export default function ServicesHeroSection() {
  return (
    <section className="relative w-full max-w-[100vw] bg-white py-16 md:py-24 lg:py-32 overflow-hidden">
      <SiteContainer className="flex flex-col">
        
        {/* Top Text Area */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-[1100px]"
        >
          <p className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px] xl:text-[56px] font-light leading-[1.2] tracking-tight text-[#01030B]">
            With a passionate team driving <span className="text-[#2666d2] font-normal">innovation</span>, Spherehead 
            delivers cutting-edge <span className="text-[#2666d2] font-normal">digital services</span> that help brands grow, 
            adapt, and stand out in <span className="text-[#2666d2] font-normal">today’s competitive</span> landscape.
          </p>
        </motion.div>

        {/* Horizontal Line Divider */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="w-full h-[1px] bg-gray-200 my-12 lg:my-20 origin-left"
        />

        {/* Bottom Layout: Image & Text */}
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_6fr] gap-10 lg:gap-16 xl:gap-20 items-start w-full">
          
          {/* Left Side: 3D Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative w-full aspect-square max-w-[500px] bg-[#184aa3] overflow-hidden mx-auto lg:mx-0 lg:max-w-none rounded-sm"
          >
            <Image 
              src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776313260/Services_y83dyy.png" 
              alt="Abstract 3D rings representing digital innovation"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Right Side: Text Blocks */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col gap-8 lg:gap-14 pt-0 lg:pt-2 w-full"
          >
            {/* Top Bold Paragraph */}
            <p className="text-[20px] md:text-[24px] lg:text-[26px] font-medium leading-[1.5] text-[#01030B]">
              We focus on creating meaningful digital experiences that connect your business with real growth, 
              because that’s where true transformation begins and lasting success is achieved.
            </p>

            {/* Bottom Split Paragraphs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10 text-[#888888]">
              <p className="font-light leading-[1.8] text-[15px] md:text-[16px]">
                Our approach begins by understanding what makes your business unique—your vision, your goals, 
                and your competitive edge. We explore how your digital presence can better serve your audience 
                by aligning technology with real user needs, behaviors, and expectations.
              </p>
              
              <p className="font-light leading-[1.8] text-[15px] md:text-[16px]">
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