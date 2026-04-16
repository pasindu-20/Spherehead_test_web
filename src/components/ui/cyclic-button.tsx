import React, { useState } from "react";
import { motion } from "motion/react";

interface CyclicButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function CyclicButton({ onClick, children, className = "" }: CyclicButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`flex items-center gap-4 text-white transition-opacity hover:opacity-90 ${className}`}
    >
      {/* Animated cyclic indicator container - Spins infinitely when hovered */}
      <motion.div
        className="relative flex items-center justify-center w-8 h-8"
        animate={isHovered ? "hover" : "initial"}
        variants={{
          initial: { rotate: 0 },
          hover: {
            rotate: 360,
            transition: { duration: 2.5, repeat: Infinity, ease: "linear" }
          }
        }}
      >
        {/* Light Blue Circle (Moves Top-Left) */}
        <motion.div
          className="absolute w-3 h-3 rounded-full"
          style={{ backgroundColor: "#92D9FF" }}
          variants={{
            initial: { x: 0, y: 0, opacity: 0, scale: 0.5 },
            hover: { x: -6, y: -7, opacity: 1, scale: 1 }
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        
        {/* Orange Circle (Moves Bottom-Left) */}
        <motion.div
          className="absolute w-3 h-3 rounded-full"
          style={{ backgroundColor: "#FD7624" }}
          variants={{
            initial: { x: 0, y: 0, opacity: 0, scale: 0.5 },
            hover: { x: -6, y: 7, opacity: 1, scale: 1 }
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        {/* White Circle (Center base, moves Right) */}
        <motion.div
          className="absolute w-3 h-3 rounded-full z-10"
          style={{ backgroundColor: "#FFFFFF" }}
          variants={{
            initial: { x: 0, y: 0 },
            hover: { x: 8, y: 0 }
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.div>
      
      <span className="text-[18px] md:text-[20px] tracking-wide" style={{ fontFamily: "var(--font-inter-tight)" }}>
        {children}
      </span>
    </button>
  );
}