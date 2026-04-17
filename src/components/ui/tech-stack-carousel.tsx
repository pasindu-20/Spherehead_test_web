"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";

export interface TechItem {
  name: string;
  icon: string;
}

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
  // FIX: Removed border-t, border-gray-100, and mt-10
  className = "w-full pt-10 pb-12 flex justify-center overflow-hidden bg-white",
}: TechStackCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Tracks the target position of the carousel
  const x = useMotionValue(0);
  
  // Adds a smooth, fluid glide to the movement
  const smoothX = useSpring(x, { damping: 40, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !trackRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const trackWidth = trackRef.current.scrollWidth;

    // How far the track is allowed to scroll
    const maxScroll = trackWidth - containerWidth;

    // If the items don't overflow the container, no need to scroll
    if (maxScroll <= 0) return;

    // Find mouse position relative to the container
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    // Convert mouse position to a percentage (0 to 1)
    const progress = Math.max(0, Math.min(mouseX / containerWidth, 1));

    // Move the track in the opposite direction of the mouse
    x.set(-(progress * maxScroll));
  };

  return (
    <div className={className} onMouseMove={handleMouseMove}>
      <div
        ref={containerRef}
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
          ref={trackRef}
          style={{ x: smoothX }} // Controlled by the mouse tracking now, not auto-animation
          className="flex items-center gap-16 md:gap-24 px-8 w-max"
        >
          {/* Render the array twice so it overflows enough to allow movement */}
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