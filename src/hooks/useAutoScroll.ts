import { useEffect, useRef } from "react";

export default function useAutoScroll() {
  const isAutoScrollingRef = useRef(false);
  const scrollStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastRestingYRef = useRef(0);

  useEffect(() => {
    lastRestingYRef.current = Math.round(window.scrollY / window.innerHeight) * window.innerHeight;

    const animateScroll = (targetY: number) => {
      if (isAutoScrollingRef.current) return;
      
      const startY = window.scrollY;
      const distance = targetY - startY;

      if (Math.abs(distance) < 5) {
        lastRestingYRef.current = targetY;
        return;
      }

      isAutoScrollingRef.current = true;
      const duration = 400; 
      const startTime = performance.now();
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        window.scrollTo(0, startY + distance * easeOut(progress));

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          window.scrollTo(0, targetY);
          lastRestingYRef.current = targetY; 
          setTimeout(() => { isAutoScrollingRef.current = false; }, 300);
        }
      };
      requestAnimationFrame(step);
    };

    const handleScroll = () => {
      if (isAutoScrollingRef.current) return;

      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);

      scrollStopTimerRef.current = setTimeout(() => {
        const currentY = window.scrollY;
        const vh = window.innerHeight;
        const maxScroll = document.documentElement.scrollHeight - vh;

        // FREE SCROLL ZONE: Assumes sections 0, 1, 2, 3 are strict 100vh.
        const FREE_SCROLL_START_VH = 3.1 * vh; 
        
        if (currentY >= FREE_SCROLL_START_VH) {
            lastRestingYRef.current = Math.round(currentY / vh) * vh;
            if (currentY > maxScroll - (vh * 0.5)) {
                animateScroll(maxScroll);
            }
            return; 
        }

        // SNAP LOGIC
        const distanceScrolled = currentY - lastRestingYRef.current;
        let targetY = lastRestingYRef.current;

        // If they deliberately swiped more than 20px, snap up/down. Otherwise snap back.
        if (distanceScrolled > 20) {
            targetY = lastRestingYRef.current + vh;
        } else if (distanceScrolled < -20) {
            targetY = lastRestingYRef.current - vh;
        }

        targetY = Math.max(0, Math.min(targetY, 3 * vh)); // Cap it at the List section
        animateScroll(targetY);

      }, 60); 
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
    };
  }, []);
}