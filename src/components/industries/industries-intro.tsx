"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

import RotatingDots from "@/components/ui/rotating-dots";
import SiteContainer from "../layout/site-container";
import { useIsMobile } from "@/hooks/use-is-mobile";

function IndustriesIntroMobile() {
  return (
    <section className="relative z-20 w-full bg-white pt-16 pb-10">
      <SiteContainer>
        <div className="flex flex-col gap-6">
          <h2 className="heading-2 !text-[#01030B]">
            We serve{" "}
            <span className="text-[#0D54CA]">diverse industries</span>{" "}
            with tailored digital solutions powered by{" "}
            <span className="text-[#0D54CA]">advanced technologies</span>,
            helping businesses innovate, scale, and succeed in a rapidly
            evolving world.
          </h2>

          <p className="body-small !text-[#8A8B8F]">
            By understanding the unique needs of each industry, we apply
            the right technologies and strategies to build scalable,
            efficient, and future-ready digital experiences.
          </p>
        </div>
      </SiteContainer>
    </section>
  );
}

function IndustriesIntroDesktop() {
  const ref = useRef<HTMLElement | null>(null);
  const lastProgress = useRef(0);
  const hasSnapped = useRef(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const cardScale = useTransform(scrollYProgress, [0.16, 0.58], [0.48, 1]);
  const cardY = useTransform(
    scrollYProgress,
    [0.16, 0.42, 0.68],
    ["10vh", "10vh", "0vh"],
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const section = ref.current;
    const isScrollingDown = latest > lastProgress.current;

    lastProgress.current = latest;

    if (!section || hasSnapped.current || !isScrollingDown || latest < 0.46) {
      if (latest < 0.25) {
        hasSnapped.current = false;
      }

      return;
    }

    hasSnapped.current = true;

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const viewportHeight = window.innerHeight;
    const snapProgress = 0.69;
    const targetY =
      sectionTop -
      viewportHeight +
      snapProgress * (section.offsetHeight + viewportHeight);

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  });

  return (
    <section ref={ref} className="relative z-20 -mt-[48vh] h-[190vh]">
      <div className="sticky top-0 h-screen overflow-hidden pointer-events-none">
        <motion.div
          style={{
            scale: cardScale,
            y: cardY,
          }}
          className="
            absolute
            bottom-0
            left-1/2
            h-screen
            w-screen
            -translate-x-1/2
            overflow-hidden
            bg-white
            origin-bottom
            shadow-[0_-20px_80px_rgba(0,0,0,0.16)]
          "
        >
          <SiteContainer className="h-full">
            <div className="flex h-full flex-col justify-center pb-24 pt-20">
              <div className="flex items-center gap-3">
                <RotatingDots variant="light" />

                <span className="body-small !text-[#01030B]">
                  Projects Delivered
                </span>
              </div>

              <div className="mt-5 max-w-[950px]">
                <h2 className="heading-2 !text-[#01030B]">
                  We serve{" "}
                  <span className="text-[#0D54CA]">diverse industries</span>{" "}
                  with tailored digital solutions powered by{" "}
                  <span className="text-[#0D54CA]">advanced technologies</span>,
                  helping businesses innovate, scale, and succeed in a rapidly
                  evolving world.
                </h2>
              </div>

              <div className="max-w-[620px] pt-16 lg:ml-[680px] lg:pt-14">
                <p className="body-large text-[#808080]">
                  By understanding the unique needs of each industry, we apply
                  the right technologies and strategies to build
                  scalable, efficient, and future-ready digital experiences.
                </p>
              </div>
            </div>
          </SiteContainer>
        </motion.div>
      </div>
    </section>
  );
}

export default function IndustriesIntro() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <IndustriesIntroMobile />;
  }

  return <IndustriesIntroDesktop />;
}
