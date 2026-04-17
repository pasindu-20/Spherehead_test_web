"use client";

import { motion } from "framer-motion";

export default function RotatingDots() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 6,
        ease: "linear",
      }}
      className="relative w-6 h-6"
    >
      {/* Dot 1 */}
      <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#2563eb] rounded-full" />

      {/* Dot 2 */}
      <span className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-[#60a5fa] rounded-full" />

      {/* Dot 3 */}
      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#f97316] rounded-full" />
    </motion.div>
  );
}