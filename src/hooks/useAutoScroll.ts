import { useEffect, useRef } from "react";

export default function useAutoScroll() {
  const isAutoScrollingRef = useRef(false);
  const autoScrollRafRef = useRef<number | null>(null);
  const scrollStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollYRef = useRef(0);
  const lastRestingYRef = useRef(0);

  useEffect(() => {
    lastRestingYRef.current = Math.round(window.scrollY / window.innerHeight) * window.innerHeight;

    const animateScroll = (target: number) => {
      if (isAutoScrollingRef.current) return;
      const startY = window.scrollY;
      const distance = target - startY;

      if (Math.abs(distance) < 5) {
        lastRestingYRef.current = target;
        return;
      }

      isAutoScrollingRef.current = true;
      const duration = 450; 
      const startTime = performance.now();
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        window.scrollTo(0, startY + distance * easeOut(progress));

        if (progress < 1) {
          autoScrollRafRef.current = requestAnimationFrame(step);
        } else {
          window.scrollTo(0, target);
          lastRestingYRef.current = target;
          setTimeout(() => { isAutoScrollingRef.current = false; }, 50);
        }
      };
      autoScrollRafRef.current = requestAnimationFrame(step);
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const vh = window.innerHeight;
      const direction = currentY > lastScrollYRef.current ? "down" : "up";
      lastScrollYRef.current = currentY;

      if (isAutoScrollingRef.current) return;
      
      // Pause snapping logic if we are deep in the horizontal section
      if (currentY > (vh * 2.1)) return;

      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);

      scrollStopTimerRef.current = setTimeout(() => {
        const closestBoundary = Math.round(currentY / vh) * vh;
        if (Math.abs(currentY - closestBoundary) <= 5) {
          lastRestingYRef.current = closestBoundary;
          return;
        }

        let targetY = direction === "down" 
          ? lastRestingYRef.current + vh 
          : lastRestingYRef.current - vh;

        const maxScroll = document.documentElement.scrollHeight - vh;
        targetY = Math.max(0, Math.min(targetY, maxScroll));
        
        animateScroll(targetY);
      }, 45); 
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
      if (autoScrollRafRef.current !== null) cancelAnimationFrame(autoScrollRafRef.current);
    };
  }, []);
}