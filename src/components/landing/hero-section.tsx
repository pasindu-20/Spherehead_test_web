"use client";
import { ChevronsDown } from "lucide-react";
import { motion } from "motion/react";
import SiteContainer from "@/components/layout/site-container";
import ConsultationCTA from "@/components/ui/consultation-cta";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <SiteContainer className="relative grid min-h-screen grid-cols-1 gap-10 pt-16 pb-12 -translate-y-6 lg:grid-cols-[minmax(0,820px)_1fr] lg:items-center lg:pt-20 lg:pb-16 lg:-translate-y-10">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <h1 className="heading-1">
            A Comprehensive
            <br />
            Technological
            <br />
            Sphere Crafted To Fulfil
            <br />
            Modern Digital Needs
          </h1>

          <p className="heading-4 text-white inline-block whitespace-nowrap mt-6 max-w-lg">
            Smart Technology Operations for smoother and hassle-free Operations
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex items-end justify-start lg:justify-end lg:self-end lg:pb-2"
        >
          <ConsultationCTA />
        </motion.div>
      </SiteContainer>

      <div className="absolute bottom-0 left-0 right-0 z-0">
        <SiteContainer>
          <div className="h-16 bg-white rounded-t-[4px] flex items-center justify-center gap-2">
            <span className="text-[12px] font-bold tracking-[0.12em] text-[#0D54CA] uppercase">
              Scroll to Discover
            </span>
            <ChevronsDown className="h-5 w-5 text-[#0D54CA]" strokeWidth={2.5} />
          </div>
        </SiteContainer>
      </div>
    </section>
  );
}