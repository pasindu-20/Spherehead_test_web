"use client";

import { motion } from "motion/react";
import SiteContainer from "@/components/layout/site-container";
import ConsultationCTA from "@/components/ui/consultation-cta";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen">
      <SiteContainer className="grid min-h-screen grid-cols-1 gap-10 pt-16 pb-12 lg:grid-cols-[minmax(0,820px)_1fr] lg:items-center lg:pt-20 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          {/* <h1 className="heading-1">
            A Comprehensive
            <br />
            Technological
            <br />
            Sphere Crafted To Fulfil
            <br />
            Modern Digital Needs
          </h1>

          <p className="mt-10 max-w-[760px] text-[32px] leading-[42px] font-light text-white">
            Smart Technology Operations for smoother and hassle-free Operations
          </p> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex items-end justify-start lg:justify-end lg:self-end lg:pb-20"
        >
          <ConsultationCTA />
        </motion.div>
      </SiteContainer>
    </section>
  );
}