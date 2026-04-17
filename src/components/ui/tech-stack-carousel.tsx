"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface TechItem {
  name: string;
  icon: string;
}

// Your default data
const defaultTechStack: TechItem[] = [
  {
    name: "PowerBI",
    icon: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776418103/Power_BI_d7qpl4.png",
  },
  {
    name: "Vector",
    icon: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776418103/Vector_thntzz.png",
  },
  {
    name: "AWS",
    icon: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776418103/aws_vz0zaq.png",
  },
  {
    name: "Docker",
    icon: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776418102/docker_wbuxim.png",
  },
  {
    name: "Java",
    icon: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776418103/java_enf1rj.png",
  },
  {
    name: "Kubernetes",
    icon: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776418103/kubernetes_u3fzkn.png",
  },
  {
    name: "Azure",
    icon: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776418103/microsoft_azure_ktcrkr.png",
  },
  {
    name: "Python",
    icon: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776418102/Python_r3ng6w.png",
  },
  {
    name: "PyTorch",
    icon: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776418103/pytorch_psxu4f.png",
  },
];

interface TechStackCarouselProps {
  items?: TechItem[];
  className?: string;
}

export default function TechStackCarousel({
  items = defaultTechStack,
  // Default styling matches exactly what was in your ServicesListSection
  className = "w-full pt-16 pb-12 mt-10 border-t border-gray-100 flex justify-center overflow-hidden bg-white",
}: TechStackCarouselProps) {
  return (
    <div className={className}>
      <div
        className="relative w-full max-w-[1200px] flex items-center"
        style={{
          // The CSS Mask that fades the left and right edges
          maskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          className="flex items-center gap-16 md:gap-24 px-8 w-max"
        >
          {/* Render the array twice for a seamless infinite loop */}
          {[...items, ...items].map((tech, i) => (
            <div
              key={i}
              className="flex shrink-0 opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-pointer"
            >
              <Image
                src={tech.icon}
                alt={tech.name}
                width={80}
                height={80}
                className="object-contain h-[50px] w-auto md:h-[60px]"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
