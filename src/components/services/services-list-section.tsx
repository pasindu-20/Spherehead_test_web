import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import SiteContainer from "@/components/layout/site-container";

const servicesData = [
  { id: "01", title: "IT Consultations", desc: "Strategic guidance to align technology with your business goals.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776313260/Services_y83dyy.png" },
  { id: "02", title: "Software Product Development", desc: "End-to-end product engineering from ideation to market entry.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776313260/Services_y83dyy.png" },
  { id: "03", title: "IoT Development", desc: "Connecting devices to create smart, data-driven ecosystems.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776313260/Services_y83dyy.png" },
  { id: "04", title: "Custom Web Development", desc: "We build custom software products that align with your vision, delivering innovation, scalability, and long-term value.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776313260/Services_y83dyy.png" },
  { id: "05", title: "Robotics & Electronics", desc: "Advanced hardware solutions and automation engineering.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776313260/Services_y83dyy.png" },
  { id: "06", title: "Quality Assurance & Testing", desc: "Rigorous testing protocols to ensure high performance.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776313260/Services_y83dyy.png" },
  { id: "07", title: "Maintenance & Support", desc: "Continuous monitoring, security updates, and performance tuning.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776313260/Services_y83dyy.png" },
];

export default function ServicesListSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    // FIX 1: Changed h-[100svh] to h-[100vh]
    <section className="relative z-30 w-full h-[100vh] bg-transparent flex flex-col justify-end">
      
      {/* FIX 2: Changed both calc(100svh-...) to calc(100vh-...) */}
      <div className="w-full mt-auto h-[calc(100vh-40px)] md:h-[calc(100vh-60px)] bg-white rounded-t-[20px] md:rounded-t-[24px] overflow-hidden flex items-center py-10 lg:py-20 shadow-[0_-20px_50px_rgba(0,0,0,0.25)]">
        <SiteContainer>
          <div className="grid grid-cols-1 lg:grid-cols-[4.5fr_5.5fr] gap-12 lg:gap-24 items-start">
            
            {/* LEFT SIDE */}
            <div className="hidden lg:flex flex-col sticky top-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#FD7624]" />
                <p className="inter-tight text-[#2666d2] font-semibold tracking-wider uppercase text-sm">Digital Services</p>
              </div>
              <h2 className="text-[42px] leading-[1.1] font-light text-[#01030B] mb-10 max-w-md">
                Driving Enterprise Value Through Scalable Tech Innovation
              </h2>
              <div className="relative w-full aspect-[4/3] bg-[#0a2f76] rounded-2xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image 
                      src={servicesData[activeIndex].image} 
                      alt={servicesData[activeIndex].title}
                      fill
                      sizes="40vw"
                      className="object-cover p-8"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col border-t border-gray-100">
              {servicesData.map((service, index) => (
                <div 
                  key={service.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  className="group cursor-pointer border-b border-gray-100 py-5 lg:py-6 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 lg:gap-10">
                      <span className={`text-lg font-medium transition-colors duration-300 ${activeIndex === index ? 'text-[#2666d2]' : 'text-gray-400'}`}>
                        {service.id}
                      </span>
                      <h3 className={`text-xl lg:text-2xl font-light transition-colors duration-300 ${activeIndex === index ? 'text-[#01030B]' : 'text-gray-500 group-hover:text-[#01030B]'}`}>
                        {service.id === "04" && index === activeIndex ? "Custom Web Development" : service.title}
                      </h3>
                    </div>
                    <Plus className={`w-5 h-5 transition-all duration-500 ${activeIndex === index ? 'rotate-45 text-[#FD7624]' : 'text-[#2666d2]'}`} />
                  </div>
                  <motion.div
                    initial={false}
                    animate={{ height: activeIndex === index ? "auto" : 0, opacity: activeIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 pb-2 text-gray-500 text-sm lg:text-base leading-relaxed max-w-lg ml-16 lg:ml-20">
                      {service.desc}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
            
          </div>
        </SiteContainer>
      </div>
    </section>
  );
}