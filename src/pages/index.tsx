import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronsDown } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
} from "motion/react";
import SiteContainer from "@/components/layout/site-container";
import ConsultationCTA from "@/components/ui/consultation-cta";
import BlueLargeRightArrow from "@/components/ui/blue-large-right-arrow";
import AboutUsButton from "@/components/ui/about-us-button";

export default function HomePage() {
  const { scrollY } = useScroll();

  const measureRef = useRef<HTMLDivElement | null>(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const updateSizes = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);

      if (measureRef.current) {
        const rect = measureRef.current.getBoundingClientRect();
        setContainerWidth(rect.width);
      }
    };

    updateSizes();

    const resizeObserver = new ResizeObserver(updateSizes);
    if (measureRef.current) {
      resizeObserver.observe(measureRef.current);
    }

    window.addEventListener("resize", updateSizes);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateSizes);
    };
  }, []);

  const animationEnd = 100;

  const rawBarHeight = useTransform(
    scrollY,
    [0, animationEnd],
    [88, viewportHeight || 900]
  );

  const rawBarWidth = useTransform(
    scrollY,
    [0, animationEnd],
    [containerWidth || 1200, viewportWidth || 1440]
  );

  const rawBarRadius = useTransform(scrollY, [0, animationEnd], [4, 4]);
  const rawLabelOpacity = useTransform(scrollY, [0, 40], [1, 0]);

  const rawHeroContentOpacity = useTransform(
    scrollY,
    [0, 2, 5, animationEnd],
    [1, 0.12, 0, 0]
  );

  const rawSubtextOpacity = useTransform(
    scrollY,
    [0, 1, 3, animationEnd],
    [1, 0.12, 0, 0]
  );

  const rawCutHeight = useTransform(scrollY, [0, animationEnd], ["0%", "40%"]);

  const rawRightPanelWidth = useTransform(
    scrollY,
    [0, animationEnd],
    ["100%", "40%"]
  );

  const rawRightPanelCutBottom = useTransform(
    scrollY,
    [0, animationEnd],
    ["0%", "12%"]
  );

  const rawAboutContentOpacity = useTransform(
    scrollY,
    [10, 28, 52],
    [0, 0.35, 1]
  );

  const springConfig = {
    stiffness: 85,
    damping: 20,
    mass: 0.8,
  };

  const barHeight = useSpring(rawBarHeight, springConfig);
  const barWidth = useSpring(rawBarWidth, springConfig);
  const barRadius = useSpring(rawBarRadius, springConfig);

  const labelOpacity = useSpring(rawLabelOpacity, {
    stiffness: 100,
    damping: 22,
    mass: 0.7,
  });

  const heroContentOpacity = useSpring(rawHeroContentOpacity, {
    stiffness: 180,
    damping: 14,
    mass: 0.5,
  });

  const subtextOpacity = useSpring(rawSubtextOpacity, {
    stiffness: 180,
    damping: 14,
    mass: 0.5,
  });

  const cutHeight = useSpring(rawCutHeight, {
    stiffness: 85,
    damping: 20,
    mass: 0.8,
  });

  const rightPanelWidth = useSpring(rawRightPanelWidth, {
    stiffness: 85,
    damping: 20,
    mass: 0.8,
  });

  const rightPanelCutBottom = useSpring(rawRightPanelCutBottom, {
    stiffness: 85,
    damping: 20,
    mass: 0.8,
  });

  const aboutContentOpacity = useSpring(rawAboutContentOpacity, {
    stiffness: 100,
    damping: 20,
    mass: 0.8,
  });

  const rightPanelHeight = useMotionTemplate`calc(${cutHeight} + 2px)`;
  const leftPanelWidth = useMotionTemplate`calc(100% - ${rightPanelWidth})`;

  const rightPanelClipPath = useMotionTemplate`
    inset(0% 0% ${rightPanelCutBottom} 0% round 4px 0px 0px 4px)
  `;

  return (
    <>
      <Head>
        <title>Spherehead Technologies</title>
        <meta
          name="description"
          content="Smart technology operations for smoother and hassle-free operations."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="relative h-[200vh] overflow-x-hidden">
        {/* HERO SECTION - FIXED BEHIND THE CARD */}
        <section className="fixed inset-0 z-0 overflow-visible">
          <motion.div style={{ opacity: heroContentOpacity }} className="h-full">
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

                <motion.p
                  style={{ opacity: subtextOpacity }}
                  className="heading-4 mt-6 inline-block max-w-lg whitespace-nowrap text-white"
                >
                  Smart Technology Operations for smoother and hassle-free
                  Operations
                </motion.p>
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
          </motion.div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 opacity-0">
            <SiteContainer>
              <div ref={measureRef} className="h-0 w-full" />
            </SiteContainer>
          </div>
        </section>

        {/* SAME HERO BOTTOM WHITE CARD */}
        <motion.div
          style={{
            height: barHeight,
            width: barWidth,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
          }}
          className="fixed bottom-0 left-1/2 z-20 -translate-x-1/2 overflow-hidden"
        >
          {/* top white section */}
          <motion.div
            style={{
              bottom: cutHeight,
              borderTopLeftRadius: barRadius,
              borderTopRightRadius: barRadius,
            }}
            className="absolute inset-x-0 top-0 bg-[#f2f2f2]"
          />

          {/* bottom-right white section */}
          <motion.div
            style={{
              width: rightPanelWidth,
              height: rightPanelHeight,
              clipPath: rightPanelClipPath,
            }}
            className="absolute bottom-0 right-0 bg-[#f2f2f2]"
          />

          <motion.div
            style={{ opacity: labelOpacity }}
            className="pointer-events-none absolute inset-x-0 top-8 z-10 flex items-center justify-center gap-2"
          >
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#0D54CA]">
              Scroll to Discover
            </span>
            <ChevronsDown
              className="h-5 w-5 text-[#0D54CA]"
              strokeWidth={2.5}
            />
          </motion.div>

          {/* TOP WHITE CONTENT */}
          <motion.div
            style={{
              bottom: cutHeight,
              opacity: aboutContentOpacity,
            }}
            className="absolute inset-x-0 top-0 z-[3] overflow-hidden"
          >
            <SiteContainer className="h-full">
              <div className="flex h-full flex-col items-center justify-center px-6 pt-10 pb-10 text-center">
                <BlueLargeRightArrow
                  className="mb-6 sm:mb-7"
                  size="h-12 w-12"
                  iconSize="h-5 w-5"
                />

                <p
                  className="max-w-[1257px] font-[400] text-[28px] leading-[1.22] tracking-[0.03em] text-black sm:text-[34px] sm:leading-[1.22] lg:text-[30px] lg:leading-[38px]"
                  style={{
                    fontFamily:
                      "var(--font-archivo), Arial, Helvetica, sans-serif",
                  }}
                >
                  <span className="text-[#2666D2]">
                    Spherehead Technologies
                  </span>{" "}
                  is a{" "}
                  <span className="text-[#2666D2]">USA established</span>{" "}
                  technology
                  <br />
                  solutions company delivering end-to-end digital services,
                  <br />
                  including software development, digital transformation, and
                  <br />
                  creative technology{" "}
                  <span className="text-[#2666D2]">
                    solutions for global clients.
                  </span>
                </p>
              </div>
            </SiteContainer>
          </motion.div>

          {/* BOTTOM LEFT STATS ON EXISTING BACKGROUND */}
          {/* BOTTOM LEFT STATS ON EXISTING BACKGROUND */}
          <motion.div
            style={{
              width: leftPanelWidth,
              height: cutHeight,
              opacity: aboutContentOpacity,
            }}
            className="absolute bottom-0 left-0 z-[3] overflow-hidden"
          >
            <div className="flex h-full items-center px-10 pl-6 sm:px-14 lg:px-16 lg:pl-24">
              <div className="flex w-full max-w-[912px] items-start justify-start gap-8">
                <div className="about-stat-item">
                  <span className="about-stat-number">30+</span>
                  <span className="about-stat-label mt-3">Projects Delivered</span>
                </div>

                <div className="about-stat-item">
                  <span className="about-stat-number">98%</span>
                  <span className="about-stat-label mt-3">Client Satisfaction</span>
                </div>

                <div className="about-stat-item">
                  <span className="about-stat-number">16+</span>
                  <span className="about-stat-label mt-3">Countries Served</span>
                </div>

                <div className="about-stat-item">
                  <span className="about-stat-number">100+</span>
                  <span className="about-stat-label mt-3">Project Completion</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{
              width: rightPanelWidth,
              height: rightPanelHeight,
              clipPath: rightPanelClipPath,
              opacity: aboutContentOpacity,
            }}
            className="absolute bottom-0 right-0 z-[4] overflow-hidden"
          >
            <div className="flex h-full flex-col items-start bg-[#f2f2f2] px-6 pl-6 pt-10 pb-8 sm:px-8 lg:px-14 lg:pl-14">
              <p className="inter-tight text-[#676767]">
                Driven by client satisfaction and continuous
                <br />
                feedback, we deliver tailored digital solutions
                <br />
                that empower businesses worldwide, building
                <br />
                lasting partnerships through trust, innovation,
                <br />
                and measurable results.
              </p>

              <div className="mt-6 -ml-3 flex items-center gap-0">
                <Image
                  src="/images/landingPage/aboutsection.svg"
                  alt="About section team"
                  width={154}
                  height={57}
                  className="h-auto w-[154px] scale-[0.85]"
                />

                <AboutUsButton className="scale-[0.75]" />
              </div>
            </div>
          </motion.div>

          <div className="relative z-[2] h-screen box-border">
            <SiteContainer className="h-full">
              <div className="h-full" />
            </SiteContainer>
          </div>
        </motion.div>
      </div>
    </>
  );
}